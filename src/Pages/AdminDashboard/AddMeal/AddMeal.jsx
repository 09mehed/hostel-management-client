import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddMeal = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth();

    const onSubmit = async (data) => {
        try {
            const imageFile = { image: data.image[0] }

            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
            console.log(res.data);

            if (res.data.success) {
                 // Prepare meal data
                const mealData = {
                    title: data.title,
                    category: data.category,
                    image: res.data.data.display_url,
                    ingredients: data.ingredients.split(',').map((item) => item.trim()),
                    description: data.description,
                    price: parseFloat(data.price),
                    distributor: user.displayName,
                    email: user.email,
                    rating: 0,
                    likes: 0,
                    reviews_count: 0,
                    post_time: new Date().toISOString(),
                };

                // Post meal data to the server
                const response = await axiosSecure.post('/meal', mealData);
                if (response.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Meal added successfully!",
                        showConfirmButton: false,
                        timer: 1500
                      });
                    reset();
                }
            }
        } catch (error) {
            console.error('Error adding meal:', error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Add Meal</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Title */}
                <label className="block mb-2">Title</label>
                <input
                    type="text"
                    {...register('title', { required: true })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
                />

                {/* Category */}
                <label className="block mb-2">Category</label>
                <input
                    type="text"
                    {...register('category', { required: true })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
                />

                {/* Image */}
                <label className="block mb-2">Image</label>
                <input
                    type="file"
                    {...register('image', { required: true })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
                />

                {/* Ingredients */}
                <label className="block mb-2">Ingredients (comma-separated)</label>
                <input
                    type="text"
                    {...register('ingredients', { required: true })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
                />

                {/* Description */}
                <label className="block mb-2">Description</label>
                <textarea
                    {...register('description', { required: true })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
                ></textarea>

                {/* Price */}
                <label className="block mb-2">Price</label>
                <input
                    type="number"
                    step="0.01"
                    {...register('price', { required: true })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
                />

                {/* Distributor Name */}
                <label className="block mb-2">Distributor Name</label>
                <input
                    type="text"
                    value={user?.displayName || ''}
                    readOnly
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 bg-gray-100"
                />

                {/* Email */}
                <label className="block mb-2">Email</label>
                <input
                    type="email"
                    value={user?.email || ''}
                    readOnly
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 bg-gray-100"
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Add Meal
                </button>
            </form>
        </div>
    );
};

export default AddMeal;
