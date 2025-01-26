import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import axios from 'axios';

const CheckOutForm = ({ packageDetails }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        if (packageDetails?.price) {
            axiosSecure.post('/create-payment-intent', { price: packageDetails.price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch(err => {
                    console.error('Error fetching clientSecret:', err.message);
                });
        }
    }, [packageDetails, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            setError('Card details are not filled out.');
            return;
        }

        setProcessing(true);
        setError('');
        setSuccess('');

        try {
            const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous',
                    },
                },
            });

            if (paymentError) {
                setError(paymentError.message);
                setProcessing(false);
                return;
            }

            if (paymentIntent?.status === 'succeeded') {
                setSuccess('Payment successful!');
                console.log('Payment Intent:', paymentIntent);
            } else {
                setError('Payment not completed. Please try again.');
            }

            const payment = {
                email: user.email,
                price: packageDetails.price,
                date: new Date(),
                packageId: packageDetails._id,
                transactionId: paymentIntent.id
            }

            const res = await axiosSecure.post('/payment', payment)
            console.log(res);
            if (res.data?.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Payment Was Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (err) {
            console.error('Payment error:', err.message);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement className="mb-4 p-2 border rounded-lg" />
            <button
                type="submit"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                disabled={!stripe || !clientSecret || processing}
            >
                {processing ? 'Processing...' : `Pay ${packageDetails.price}`}
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {success && <p className="text-green-500 mt-4">{success}</p>}
        </form>
    );
};

export default CheckOutForm;
