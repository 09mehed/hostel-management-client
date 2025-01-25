import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Payment = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: payment = [] } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment`)
            return res.data
        }
    })
    return (
        <div>
            <h2 className='text-2xl p-5'>Total Payment: {payment.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>price</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            payment.map((payments, index) => <tr key={payments._id}>
                            <th>{index + 1}</th>
                            <td>{}</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr>)
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Payment;