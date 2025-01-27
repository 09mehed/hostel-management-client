import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Meal = () => {
    const [meals, setMeals] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(10);
    const [totalPages, setTotalPages] = useState(10);
    const itemsPerPage = 10;

    // Fetch meals from the server
    const fetchMeals = async () => {
        try {
            const res = await axiosSecure.get(
                `/meal?search=${search}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`
            );

            setMeals(res.data.meals || res.data);
            setTotalPages(Math.ceil((res.data.total || res.data.length) / itemsPerPage));
            
        } catch (error) {
            console.error('Error fetching meals:', error);
        }
    };

    // Fetch meals on filter change
    useEffect(() => {
        fetchMeals();
    }, [search, category, minPrice, maxPrice, currentPage]);

    const handlePageChange = e => {
        console.log(e.target.value);
        // if (page > 0 && page <= totalPages) {
        //     setCurrentPage(page);
        // }
    };

    return (
        <div className="w-11/12 mx-auto">
            <h2 className="text-3xl font-semibold">All Meals</h2>

            {/* Filter Inputs */}
            <div className="py-3 flex justify-between gap-3">
                <input
                    type="text"
                    placeholder="Search meals..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-1/3 py-2 text-center border rounded"
                />
                <select
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    className="w-1/3 py-2 border rounded"
                >
                    <option value="">Select Category</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                </select>
                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-1/6 py-2 text-center border rounded"
                />
            </div>

            {/* Display Meals */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-3">
                {meals.map((meal) => (
                    <div key={meal._id} className="card bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                            <img
                                src={meal.image}
                                alt={meal.title}
                                className="rounded-xl w-full h-44"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{meal.title}</h2>
                            <p>Category: {meal.category}</p>
                            <p>{meal.description}</p>
                            <h3>Price: ${meal.price}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 py-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Meal;
