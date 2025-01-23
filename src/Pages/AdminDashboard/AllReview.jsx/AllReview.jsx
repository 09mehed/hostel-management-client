import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllReview = () => {
    const [reviews, setReviews] = useState([]); // Store all reviews
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure()

    // Fetch all reviews from the server
    const fetchReviews = async () => {
        try {
            const response = await axiosSecure.get('/reviews'); 
            console.log(response.data); 
            if (Array.isArray(response.data.data)) {
                setReviews(response.data.data); 
            } else {
                console.error('Unexpected response data format:', response.data);
                setReviews([]); 
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setReviews([]); 
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchReviews();
    }, []);

    // Handle delete review
    const handleDelete = async (id) => {
        const confirm = window.confirm('Are you sure you want to delete this review?');
        if (confirm) {
            try {
                await axios.delete(`/reviews/${id}`); // Replace with your DELETE API endpoint
                setReviews((prevReviews) => prevReviews.filter((review) => review._id !== id)); // Update the UI
                alert('Review deleted successfully!');
            } catch (error) {
                console.error('Error deleting review:', error);
            }
        }
    };

    // Handle view meal (can redirect or show a modal)
    const handleViewMeal = (mealId) => {
        alert(`View meal details for ID: ${mealId}`);
        // You can navigate to a meal details page or show a modal with more information
    };

    return (
        <div className="w-11/12 mx-auto py-5">
            <h2 className="text-3xl font-semibold mb-5">All Reviews</h2>

            {/* Loading and No Data Message */}
            {loading ? (
                <p className="text-gray-500">Loading reviews...</p>
            ) : reviews.length === 0 ? (
                <p className="text-gray-500">No reviews found!</p>
            ) : (
                <div className="overflow-x-auto">
                    {/* Reviews Table */}
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="border border-gray-300 px-4 py-2">Meal Title</th>
                                <th className="border border-gray-300 px-4 py-2">Likes</th>
                                <th className="border border-gray-300 px-4 py-2">Reviews Count</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review) => (
                                <tr key={review._id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2">{review.title}</td>
                                    <td className="border border-gray-300 px-4 py-2">{review.likes}</td>
                                    <td className="border border-gray-300 px-4 py-2">{review.reviews_count}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded mr-2 hover:bg-red-600"
                                            onClick={() => handleDelete(review._id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                            onClick={() => handleViewMeal(review._id)}
                                        >
                                            View Meal
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllReview;
