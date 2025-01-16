import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';

const JoinUs = () => {
    const [isLogin, setIsLogin] = useState(true); 
    const { register, handleSubmit, reset } = useForm();
    const { handleGoogleLogin } = useAuth()

    const handleGoogleSignIn = () => {
        handleGoogleLogin();
        navigate('/');  
    };

    const onSubmit = (data) => {
        if (isLogin) {
            console.log('Login Data:', data);
        } else {
            console.log('Register Data:', data);
        }
        reset();
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

                    {/* photo Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">
                            Photo URL
                        </label>
                        <input
                            type="url"
                            id="email"
                            {...register('photoURL', { required: true })}
                            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

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

                    {/* Conditional: Confirm Password for Registration */}
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
                        <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google Logo" className="w-5 h-5" />
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
