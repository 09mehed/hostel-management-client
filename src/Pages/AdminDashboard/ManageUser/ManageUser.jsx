import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageUser = () => {
    const axiosSecure = useAxiosSecure()

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users',)
            return res.data
        }
    })

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an admin now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div>
            <div className='flex justify-evenly my-5'>
                <div className="text-2xl">Manage User</div>
                <div className="text-2xl">Total User: {users.length}</div>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className='btn bg-orange-500 btn-xl'> <FaUsers className='text-white'></FaUsers> </button>}
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;