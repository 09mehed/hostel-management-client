import React from 'react';
import { Link } from 'react-router-dom';

const FoodCard = ({ item }) => {
    const { title, image, rating, price, _id } = item
    return (
        <div>
            <div className="card bg-base-100 shadow-xl pt-5">
                <div className=''>
                    <figure>
                        <img
                            src={image}
                            alt="Shoes"
                            className='h-48 w-full' />
                    </figure>
                </div>
                <div className="py-3 card-body">
                    <h2 className="card-title">{title}</h2>
                    <div className='flex justify-between items-center'>
                        <p>Rating: {rating}</p>
                        <p>Price: {price}</p>
                    </div>
                    <div className="card-actions justify-end">
                        <Link to={`/mealDetails/${_id}`}>
                            <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                Details
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;