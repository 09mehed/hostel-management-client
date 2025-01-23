import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const CheckOutForm = ({packageDetails}) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const {user} = useAuth()

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('one');
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        console.log('two');
        if(card === null){
            return
        }
        console.log('card element', card);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        // if (error) {
        //     setError(error.message);
        //     return;
        // }else{
        //     console.log('Payment Method', paymentMethod);
        // }

        // // const { id } = paymentMethod;

        // const { data } = await axiosSecure.post('/create-payment-intent', {
        //     price: packageDetails.price
        // });
        // console.log(data);
        // setClientSecret(data.clientSecret)
        // if (data.success) {
        //     setSuccess('Payment successful!');
        //     // Save payment to database
        //     // await axiosSecure.post('/save-payment', {
        //     //     packageName: packageDetails.name,
        //     //     paymentId: data.paymentId,
        //     //     amount: packageDetails.price,
        //     // });
        // } else {
        //     setError('Payment failed. Please try again.');
        // }

        // const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
        //     payment_method: {
        //         card: card,
        //         billing_details: {
        //             email: user?.email || 'anonymous',
        //             name: user?.displayName || 'anonymous'
        //         }
        //     }
        // })

        // if(confirmError){
        //     console.log('confirm error');
        // }else{
        //     console.log('payment intent', paymentIntent);
        // }
    };
    return (
        <form onSubmit={handleSubmit}>
            <CardElement className="mb-4 p-2 border rounded-lg" />
            <button
                type="submit"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                disabled={!stripe || !clientSecret}
            >
                Pay ${packageDetails.price}
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {success && <p className="text-green-500 mt-4">{success}</p>}
        </form>
    );
};

export default CheckOutForm;