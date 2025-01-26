import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const RequestMeal = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: food = [], isLoading, refetch } = useQuery({
        queryKey: ['meal', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/student-order/${user?.email}`)
            return data
        }
    })

    const totalPrice = food.reduce((total, item) => total + item.price, 0)

    if (isLoading) {
        return <h2>Loading....</h2>
    }

    return (
        <div>
            <div className='flex justify-evenly pt-5'>
                <h2 className='text-3xl'>Request Meal: {food.length}</h2>
                <h2 className='text-3xl'>TotalPrice: {totalPrice}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Like</th>
                            <th>Review_Count</th>
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
                                <td></td>
                                <td>Blue</td>
                                <td>{item.status}</td>
                                <td>
                                    <button className='btn btn-primary'>Cancel</button>
                                </td>
                            </tr>)
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestMeal;