import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useMenu from '../../../hooks/useMenu';
import { Link } from 'react-router-dom';


const AllMeals = () => {
  const [, , refetch] = useMenu();
  const [meal, setMeal] = useState([]);
  const [sortField, setSortField] = useState('likes');
  const [sortOrder, setSortOrder] = useState('desc');
  const axiosSecure = useAxiosSecure()

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  useEffect(() => {
    const fetchSortedMeals = async () => {
      try {
        const { data } = await axiosSecure.get(`/meals?sortField=${sortField}&sortOrder=${sortOrder}`);
        setMeal(data);
      } catch (error) {
        console.error("Error fetching sorted meals:", error);
      }
    };

    fetchSortedMeals();
  }, [sortField, sortOrder, axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/meal/${id}`)
        if (res.data.deletedCount > 0) {
          refetch()
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Data deleted Successfully",
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    });
  };

  return (
    <div className="w-11/12 mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">All Meals</h1>
      <div className="flex justify-between mb-4">
        <button
          onClick={() => handleSort('likes')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Likes দিয়ে সোর্ট ({sortOrder === 'asc' ? 'ASC' : 'DESC'})
        </button>
        <button
          onClick={() => handleSort('reviews_count')}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Reviews দিয়ে সোর্ট ({sortOrder === 'asc' ? 'ASC' : 'DESC'})
        </button>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Likes</th>
            <th className="border px-4 py-2">Reviews Count</th>
            <th className="border px-4 py-2">Rating</th>
            <th className="border px-4 py-2">Distributor Name</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {meal.map((meal) => (
            <tr key={meal._id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{meal.title}</td>
              <td className="border px-4 py-2">{meal.likes}</td>
              <td className="border px-4 py-2">{meal.reviews_count}</td>
              <td className="border px-4 py-2">{meal.rating}</td>
              <td className="border px-4 py-2">{meal.distributor}</td>
              <td className="border px-4 py-2">
                <div className='flex justify-center'>
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">View</button>
                  <Link to={`/dashboard/updateItems/${meal._id}`}>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Update</button>
                  </Link>
                </div>
                <div className='text-center py-3'>
                  <button
                    onClick={() => handleDelete(meal._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllMeals;
