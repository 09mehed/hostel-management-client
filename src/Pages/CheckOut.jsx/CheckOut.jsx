import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import CheckOutForm from './CheckOutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const CheckOut = () => {
    const { packageName } = useParams()
    console.log(packageName);
    const axiosSecure = useAxiosSecure();
    const [packageDetails, setPackageDetails] = useState(null);

    useEffect(() => {
        axiosSecure.get(`/packages/${packageName}`)
        .then((res) => {
            setPackageDetails(res.data);
        });
        console.log(packageName);
    }, [packageName, axiosSecure]);

    if (!packageDetails) {
        return <progress className="progress w-56"></progress>;
    }

    return (
        <div className="w-11/12 mx-auto my-12">
            <h2 className="text-3xl font-bold text-center mb-8">Checkout</h2>
            <div className="p-6 rounded-lg shadow-md bg-gray-100">
                <h3 className="text-2xl font-bold mb-4">{packageDetails.name}</h3>
                <p className="text-xl mb-6">Price: {packageDetails.price}</p>
                <Elements stripe={stripePromise}>
                    <CheckOutForm packageDetails={packageDetails} />
                </Elements>
            </div>
        </div>
    );
};

export default CheckOut;