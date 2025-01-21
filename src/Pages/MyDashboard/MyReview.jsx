import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyReview = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        if (user) {
            axiosSecure.get(`/my-reviews?email=${user?.email}`)
                .then((response) => {
                    console.log(response.data);
                    setReviews(response.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching reviews:", err);
                    setLoading(false);
                });
        }
    }, [user, axiosSecure]);

    if (loading) {
        return <p>Loading reviews...</p>;
    }

    if (!reviews || !reviews.length) {
        return <div className="w-11/12 mx-auto"><p>No reviews found.</p></div>;
    }

    return (
        <div className="w-11/12 mx-auto">
            <h2 className="text-2xl font-semibold my-4">My Reviews: {reviews.length}</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Title</th>
                        <th className="border border-gray-300 px-4 py-2">Likes</th>
                        <th className="border border-gray-300 px-4 py-2">Review</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((meal) => (
                        <tr key={meal._id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{meal.title}</td>
                            <td className="border border-gray-300 px-4 py-2">{meal.likes || 0}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {meal.reviews && meal.reviews.length > 0
                                    ? meal.reviews[0].text || "No review text available"
                                    : "No reviews"}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 space-x-2">
                                <button
                                    onClick={() => handleEdit(meal._id)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(meal._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleViewMeal(meal._id)}
                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                >
                                    View Meal
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyReview;