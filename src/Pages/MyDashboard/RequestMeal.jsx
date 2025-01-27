import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

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

    const mutation = useMutation({
        mutationFn: (mealId) => axiosSecure.delete(`/student-order/${mealId}`).then(e=>{refetch(), console.log(mealId)}), 
        onSuccess: () => {
            
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Meal Cancelled Successfully',
                showConfirmButton: false,
                timer: 1500,
            });
        },
        onError: (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'An error occurred while canceling the meal.',
            });
        }
    });

    const handleCancel = (mealId) => {
        mutation.mutate(mealId);
            console.log(mealId);

        
    };

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
                                <td>{item.likes || 0}</td>
                                <td>{item.reviews_count || 0}</td>
                                <td>{item.status}</td>
                                <td>
                                    <button
                                        className='btn btn-primary'
                                        onClick={() => handleCancel(item._id)}
                                    >
                                        Cancel
                                    </button>
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