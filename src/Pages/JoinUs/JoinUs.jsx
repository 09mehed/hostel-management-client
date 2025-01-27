import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const JoinUs = () => {
    const [isLogin, setIsLogin] = useState(true); // Login/Register toggle
    const axiosPublic = useAxiosPublic(); // Axios instance
    const navigate = useNavigate(); // Navigation
    const { register, handleSubmit, reset } = useForm(); // React Hook Form
    const { handleGoogleLogin, handleSignUp, handleSignIn } = useAuth(); // Custom Auth Hooks

    // Google Sign-In Handler
    const handleGoogleSignIn = async () => {
        try {
            const data = await handleGoogleLogin(); // Google login function
            const user = data.user; // Get user details

            const userInfo = {
                name: user.displayName || 'Anonymous User',
                email: user.email,
                photoURL: user.photoURL || '',
                badge: 'bronze', // Default badge
                status: 'active', // Default status
            };

            await axiosPublic.post('/users', userInfo); // Save user to database
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Login Successful!',
                showConfirmButton: false,
                timer: 1500,
            });
            navigate('/'); // Redirect to home page
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.message || 'Google Login Failed!',
            });
        }
    };

    // Form Submission Handler
    const onSubmit = async (data) => {
        const { email, password, photoURL, confirmPassword } = data;

        if (!isLogin) {
            // Registration Logic
            if (password !== confirmPassword) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Passwords do not match!',
                });
                return;
            }

            try {
                const result = await handleSignUp(email, password); // Sign-Up function
                const user = result.user;

                const userInfo = {
                    name: user.displayName || 'Anonymous User',
                    email: user.email,
                    photoURL: photoURL || '',
                    badge: 'bronze', // Default badge
                    status: 'active', // Default status
                };

                const res = await axiosPublic.post('/users', userInfo); // Save user to database
                if (res.data.insertedId) {
                    reset(); // Reset form
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Registration Successful!',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate('/'); // Redirect to home page
                }
            } catch (err) {
                console.error(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message || 'Registration Failed!',
                });
            }
        } else {
            // Login Logic
            try {
                const result = await handleSignIn(email, password); // Login function
                const user = result.user;

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Login Successful!',
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate('/'); // Redirect to home page
            } catch (err) {
                console.error(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message || 'Login Failed!',
                });
            }
        }

        reset(); // Reset form fields
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">
                    {isLogin ? 'Login' : 'Register'}
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', { required: true })}
                            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Photo URL Field */}
                    {!isLogin && (
                        <div>
                            <label htmlFor="photoURL" className="block text-sm font-medium">
                                Photo URL
                            </label>
                            <input
                                type="url"
                                id="photoURL"
                                {...register('photoURL', { required: true })}
                                className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register('password', { required: true })}
                            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Confirm Password Field */}
                    {!isLogin && (
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                {...register('confirmPassword', { required: true })}
                                className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>

                {/* Google Sign-In Button */}
                <div className="mt-4">
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 flex items-center justify-center gap-2"
                    >
                        <img
                            src="https://img.icons8.com/color/48/google-logo.png"
                            alt="Google Logo"
                            className="w-5 h-5"
                        />
                        Continue with Google
                    </button>
                </div>

                {/* Toggle Button */}
                <p className="text-center mt-4">
                    {isLogin ? 'Don’t have an account?' : 'Already have an account?'}{' '}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-500 hover:underline"
                    >
                        {isLogin ? 'Register' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default JoinUs;
