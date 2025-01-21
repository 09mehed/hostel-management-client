import React from 'react';
import useAuth from '../../hooks/useAuth';

const MyProfile = () => {
    const { user } = useAuth(); // useAuth থেকে user তথ্য পাওয়ার অনুমান

    return (
        <div className="w-11/12 mx-auto mt-8 p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-semibold mb-4 text-center">My Profile</h2>
            <div className="flex flex-col items-center">
                <img 
                    src={user?.photoURL || "https://via.placeholder.com/150"} // Placeholder image if no photoURL
                    alt="User Profile"
                    className="w-32 h-32 rounded-full border mb-4"
                />
                <h3 className="text-lg font-bold">{user?.displayName || "No Name Provided"}</h3>
                <p className="text-gray-600">{user?.email || "No Email Provided"}</p>
            </div>
        </div>
    );
};

export default MyProfile;