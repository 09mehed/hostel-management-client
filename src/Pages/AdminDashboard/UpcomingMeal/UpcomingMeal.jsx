import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const UpcomingMeal = () => {
  const [upcomingMeals, setUpcomingMeals] = useState([]);
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    const fetchUpcomingMeals = async () => {
      try {
        const response = await axiosSecure.get('/upcoming-meals'); // Replace with your actual API endpoint
        setUpcomingMeals(response.data);
      } catch (error) {
        console.error("Error fetching upcoming meals:", error);
      }
    };

    fetchUpcomingMeals();
  }, []);

  return (
    <div>
      <h1>Upcoming Meals</h1>
      <button className='btn btn-link'>Upcoming Meal</button>
      <ul>
        {upcomingMeals.map((meal) => (
          <li key={meal._id}>
            <h3>{meal.name}</h3>
            <p>{meal.description}</p>
            <p>Publish Date: {new Date(meal.publishDate).toLocaleString()}</p>
            <p>Likes: {meal.likes.length}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingMeal;