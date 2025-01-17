import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';

const MyReview = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useAuth()
    return (
        <div>
            My Review
        </div>
    );
};

export default MyReview;