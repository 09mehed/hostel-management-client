import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Meal = () => {
    const [meals, setMeals] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const axiosSecure = useAxiosSecure()

    // Fetch meals from the server with applied filters
    const fetchMeals = async () => {
        try {
            const res = await axiosSecure.get(`/meal?search=${search}&category=${category}&price=${price}`);
            console.log('Fetched Meals:', res.data); // Debugging
            setMeals(res.data);
        } catch (error) {
            console.error('Error fetching meals:', error);
        }
    };

    // Call fetchMeals when any filter changes
    useEffect(() => {
        fetchMeals();
    }, [search, category, price]);

    // Handle price input change
    const handlePriceChange = (e) => {
        setPrice(parseFloat(e.target.value) || 0);  // Convert to number
    };

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
                <div className='w-1/2'>
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={handlePriceChange} // Set minimum price
                        className='w-full p-2'
                    />
                </div>
            </div>

            {/* Display Meals */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-3'>
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
                            <h2 className="card-title">{meal.category}</h2>
                            <p>{meal.description}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Meal;
