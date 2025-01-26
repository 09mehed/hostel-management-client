import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const SarveMeal = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [searchTerm, setSearchTerm] = useState('');
    const { data: food = [], isLoading, refetch } = useQuery({
        queryKey: ['meal', user?.email, searchTerm],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/student-order/${user?.email}`, {
                params: { search: searchTerm }  // Pass search term to server
            })
            return data
        }
    })

    
    // const handleStatusChange = async (id, prevStatus, serviceStatus) => {
    //     if(prevStatus === serviceStatus || prevStatus === 'Complete'){
    //         return console.log("Not Allow");
    //     }

    //     try{
    //         const {data} = await axiosSecure.patch(`/service-status-update/${id}`, {serviceStatus})
    //         console.log(data);
    //         fetchBookedService()
    //     }catch(err){
    //         console.log(err.message);
    //     }
    // }

    const serveMeal = async (mealId) => {
        try {
            const res = await axiosSecure.patch(`/request/status/${mealId}`, { status: 'Delivered' });
            refetch();
            console.log(res.data);
        } catch (error) {
            console.error('Error serving meal:', error);
        }
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    if (isLoading) {
        return <h2>Loading....</h2>
    }

    return (
        <div>
            <div className='flex justify-evenly pt-5'>
                <h2 className='text-3xl'>Request Meal: {food.length}</h2>
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="border p-2"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>User Email</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>State</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            food.map((item, index) => <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>{item.title}</td>
                                <td>{item.student.email}</td>
                                <td>{item.student.name}</td>
                                <td>{item.status}</td>
                                <td>
                                    {item.status !== 'Delivered' && (
                                        <button 
                                            className='btn btn-primary'
                                            onClick={() => serveMeal(item._id)} // Call serveMeal on button click
                                        >
                                            Serve
                                        </button>
                                    )}
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SarveMeal;