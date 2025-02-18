import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const reviews = [
    { id: 1, name: "Sabbir Ahmed", review: "Amazing service! Highly recommend.", rating: 5 },
    { id: 2, name: "Samim Hossain", review: "Great experience, very comfortable stay.", rating: 4 },
    { id: 3, name: "Asadujjaman", review: "Loved the hospitality. Will come again!", rating: 4.5 },
];

const Review = () => {
    const slider = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-6">Customer Reviews</h2>
            <Slider {...slider}>
                {reviews.map((review) => (
                    <div key={review.id} className="bg-white p-6 rounded shadow-md text-center">
                        <h3 className="text-xl font-semibold mb-2">{review.name}</h3>
                        <p className="text-gray-600 mb-4">"{review.review}"</p>
                        <p className="text-yellow-500">{"⭐".repeat(review.rating)}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Review;
