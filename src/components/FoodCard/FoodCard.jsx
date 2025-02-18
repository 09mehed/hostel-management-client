import React from 'react';
import { Link } from 'react-router-dom';

const FoodCard = ({ item }) => {
    const { title, image, description, _id } = item
    return (
        <div>
            <div className="card bg-base-100 shadow-xl">
                <figure className="px-5 pt-5">
                    <img
                        src={image}
                        alt="image"
                        className="rounded-xl w-full h-48" />
                </figure>
                <div className="card-body h-64">
                    <h2 className="card-title">{title}</h2>
                    <p className='text-left'>{description}</p>
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



