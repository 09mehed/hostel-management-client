import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MealPage = () => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const axiosSecure = useAxiosSecure()

    // Fetch meals with filters
    const { data: meals = [], isLoading, refetch } = useQuery({
        queryKey: ['meal', search, category, minPrice, maxPrice],
        queryFn: async () => {
            const res = await axiosSecure.get('/meal', {
                params: { search, category, minPrice, maxPrice },
            });
            return res.data;
        }
    }
        
    );

    const handleSearch = (e) => {
        setSearch(e.target.value);
        refetch(); // Trigger API call
    };

    const handleFilter = () => {
        refetch(); // Trigger API call
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="w-11/12 mx-auto my-12">
            <h2 className="text-3xl font-bold text-center mb-8">Our Meals</h2>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                {/* Search */}
                <input
                    type="text"
                    placeholder="Search meals..."
                    value={search}
                    onChange={handleSearch}
                    className="px-4 py-2 border rounded-md w-full md:w-1/3 mb-4 md:mb-0"
                />

                {/* Filter by Category */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="px-4 py-2 border rounded-md w-full md:w-1/4 mb-4 md:mb-0"
                >
                    <option value="">All Categories</option>
                    <option value="Indian">BreakFast</option>
                    <option value="American">Lunch</option>
                    <option value="Japanese">Dinner</option>
                </select>

                {/* Filter by Price Range */}
                <div className="flex items-center space-x-4">
                    <input
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="px-4 py-2 border rounded-md"
                    />
                    <input
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="px-4 py-2 border rounded-md"
                    />
                    <button
                        onClick={handleFilter}
                        className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>

            {/* Meal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {meals.map((meal) => (
                    <div key={meal._id} className="p-6 rounded-lg shadow-md bg-gray-100">
                        <h3 className="text-2xl font-bold mb-4">{meal.name}</h3>
                        <p className="text-lg mb-2">Category: {meal.category}</p>
                        <p className="text-lg mb-2">Price: ${meal.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MealPage;
