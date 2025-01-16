import React, { useEffect, useState } from "react";
import axios from "axios";

const UpCommingMeal = () => {
  const [meals, setMeals] = useState([]); // Ensure meals is initialized as an array
  const [user, setUser] = useState({}); // To store logged-in user info
  const [error, setError] = useState("");

  // Fetch upcoming meals
  useEffect(() => {
    axios
      .get("/upcoming-meals")
      .then((res) => {
        // Ensure response data is an array
        setMeals(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error(err);
        setMeals([]); // Fallback to an empty array on error
      });
  }, []);

  // Fetch logged-in user info
  useEffect(() => {
    axios
      .get("/user-info", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Handle like
  const handleLike = (mealId) => {
    if (!["Silver", "Gold", "Platinum"].includes(user.subscription)) {
      setError("Only premium users can like meals.");
      return;
    }

    axios
      .patch(`/meal/like/${mealId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        // Update likes locally after a successful request
        setMeals((prevMeals) =>
          prevMeals.map((meal) =>
            meal._id === mealId ? { ...meal, likes: meal.likes + 1 } : meal
          )
        );
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to like the meal. Please try again.");
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Upcoming Meals</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div
              key={meal._id}
              className="border rounded-md p-4 shadow-lg flex flex-col justify-between"
            >
              <h3 className="text-lg font-semibold">{meal.name}</h3>
              <p className="text-sm text-gray-600">{meal.description}</p>
              <p className="text-sm text-gray-500">
                Publish Date: {new Date(meal.publishDate).toLocaleDateString()}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <button
                  className={`px-4 py-2 rounded text-white ${
                    ["Silver", "Gold", "Platinum"].includes(user.subscription)
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() => handleLike(meal._id)}
                  disabled={!["Silver", "Gold", "Platinum"].includes(user.subscription)}
                >
                  Like
                </button>
                <span>{meal.likes || 0} Likes</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No upcoming meals found.</p>
        )}
      </div>
    </div>
  );
};

export default UpCommingMeal;
