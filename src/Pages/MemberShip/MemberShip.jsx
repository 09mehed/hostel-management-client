import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const Membership = () => {
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    const { data: menu = [], isLoading } = useQuery({
        queryKey: ['packages'],
        queryFn: async() => {
            const res = await axiosSecure.get('/packages')
            return res.data
        }
    });
    
    if(isLoading){
        return <progress className='progress w-56'></progress>
    }

    return (
        <div className="w-11/12 mx-auto my-12">
            <h2 className="text-3xl font-bold text-center mb-8">Upgrade to Premium Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {menu.map((pkg) => (
                    <div
                        key={pkg.name}
                        className={`p-6 rounded-lg shadow-md ${pkg.bgColor}`}
                    >
                        <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
                        <p className="text-4xl font-bold mb-6">{pkg.price}</p>
                        <ul className="mb-6">
                            {pkg.benefits.map((benefit, index) => (
                                <li key={index} className="text-lg mb-2">
                                    - {benefit}
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => navigate(`/checkout/${pkg.name}`)} className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                            Choose {pkg.name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Membership;
