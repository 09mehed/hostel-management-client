import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Meal = () => {
    const [meals, setMeals] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);
    const axiosSecure = useAxiosSecure()

    // Fetch meals from the server with applied filters
    const fetchMeals = async () => {
        try {
            const data = await axiosSecure.get(`/meal?search=${search}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
            setMeals(data);
        } catch (error) {
            console.error('Error fetching meals:', error);
        }
    };

    // Call fetchMeals when any filter changes
    useEffect(() => {
        fetchMeals();
    }, [search, category, minPrice, maxPrice]);

    return (
        <div className="w-11/12 mx-auto ">
            <h2 className='text-3xl font-semibold'>All Meals</h2>

            {/* Search Bar */}
            <div className='py-3 flex justify-between gap-3'>
                <div className='w-2/3'>
                    <input
                        type="text"
                        placeholder="Search meals..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='w-full py-2 text-center' // Set search query
                    />
                </div>
                <div className='w-1/3'>
                    {/* Category Filter */}
                    <select onChange={(e) => setCategory(e.target.value)} value={category}>
                        <option value="">Select Category</option>
                        <option value="Veg">Breakfast</option>
                        <option value="Non-Veg">Lunch</option>
                        <option value="Dessert">Dinner</option>
                        {/* Add more categories here */}
                    </select>
                </div>
            </div>



            {/* Price Range Filter */}
            <div className='flex justify-between gap-3'>
                <div className='w-1/2'>
                    <input
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)} // Set minimum price
                        className='w-full p-2' 
                    />
                </div>
                <div className='w-1/2'>
                    <input
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)} // Set maximum price
                        className='w-full py-2 px-2' 
                    />
                </div>
            </div>

            {/* Display Meals */}
            <div className="meal-list">
                {meals.length > 0 ? (
                    meals.map((meal) => (
                        <div key={meal._id} className="meal-card">
                            <h3>{meal.name}</h3>
                            <p>{meal.description}</p>
                            <p>Price: ${meal.price}</p>
                            <p>Category: {meal.category}</p>
                        </div>
                    ))
                ) : (
                    <p>No meals found.</p>
                )}
            </div>
        </div>
    );
};

export default Meal;
