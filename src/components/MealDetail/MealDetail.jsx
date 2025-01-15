import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery, useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const MealDetail = () => {
    const { category, description, price, image, title, ingredients, distributor, email, postTime, rating } = useLoaderData();
    const [likeCount, setLikeCount] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const axiosSecure = useAxiosSecure();

    const handleLike = () => {
        axiosSecure.post('/like-meal', { mealId: title })
            .then(() => setLikeCount(likeCount + 1))
            .catch(err => console.error(err));
    };

    const handleRequestMeal = () => {
        axiosSecure.post('/request-meal', { mealId: title })
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Mail request has been saved in pending status.",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(err => console.error(err));
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (!newReview.trim()) return;

        const mealInfo = {
            mealId: title,
            review: newReview
        }

        axiosSecure.post('/add-review', mealInfo)
            .then(() => {
                setReviews([...reviews, newReview]);
                setNewReview('');
            })
            .catch(err => console.error(err));
    };

    return (
        <div className='w-11/12 mx-auto flex flex-col lg:flex-row justify-between gap-12'>
            <div className='flex flex-col gap-6 flex-1'>
                <div className='w-full overflow-hidden rounded-xl'>
                    <img
                        className='object-cover w-full'
                        src={image}
                        alt='meal image'
                    />
                </div>
            </div>

            <div className='md:gap-10 flex-1'>
                <div>
                    <h2 className='text-3xl font-semibold py-2'>Title: {title}</h2>
                    <p>Post Time: {postTime}</p>
                    <p>Rating: {rating}/5</p>
                </div>
                <div>
                    <h2 className='text-xl py-1'>Category: {category}</h2>
                </div>
                <div className='text-lg font-light text-neutral-500'>
                    {description}
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-semibold">Ingredients:</h3>
                    <ul className="list-disc ml-6 mt-2">
                        {ingredients?.map((ingredient, index) => (
                            <li key={index} className="text-lg text-gray-700">
                                {ingredient}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-6 text-xl font-semibold">
                    <p>Distributor: {distributor}</p>
                    <p>Email: <a href={`mailto:${email}`} className="text-blue-500 underline">{email}</a></p>
                </div>

                <div className='flex justify-between pt-3'>
                    <p className='font-bold text-3xl text-gray-500'>Price: {price}$</p>
                </div>

                <div className="flex gap-4 mt-4">
                    <button
                        onClick={handleLike}
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                    >
                        Like ({likeCount})
                    </button>
                    <button
                        onClick={handleRequestMeal}
                        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                    >
                        Request Meal
                    </button>
                </div>

                <div className="mt-8">
                    <h3 className="text-xl font-semibold">Reviews:</h3>
                    <ul className="list-disc ml-6 mt-2">
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <li key={index} className="text-lg text-gray-700">{review}</li>
                            ))
                        ) : (
                            <p className="text-gray-500">No reviews yet.</p>
                        )}
                    </ul>

                    <form onSubmit={handleSubmitReview} className="mt-4">
                        <textarea
                            className="w-full border rounded p-2"
                            rows="3"
                            placeholder="Write a review..."
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 mt-2 rounded hover:bg-blue-600"
                        >
                            Submit Review
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MealDetail;
