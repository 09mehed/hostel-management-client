import React, { useState } from 'react';

const Room = () => {
    const [bookingStatus, setBookingStatus] = useState(null);
    
    const rooms = [
        { id: 1, type: 'Single Room', available: true, price: '$50' },
        { id: 2, type: 'Double Room', available: false, price: '$75' },
        { id: 3, type: 'Triple Room', available: true, price: '$100' },
        { id: 4, type: 'Quad Room', available: true, price: '$120' },
    ];

    const handleBooking = (room) => {
        if (room.available) {
            setBookingStatus(`You have successfully booked the ${room.type}!`);
        } else {
            setBookingStatus(`Sorry, the ${room.type} is not available.`);
        }
    };

    return (
        <div className="w-11/12 mx-auto py-16">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-3">Room Availability</h2>
                <p className="mb-5">Check out the available rooms for your stay</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {rooms.map((room) => (
                        <div
                            key={room.id}
                            className={`bg-white p-6 rounded-lg shadow-md ${room.available ? 'border-2 border-green-500' : 'border-2 border-red-500'}`}
                        >
                            <h3 className="text-xl font-semibold mb-4">{room.type}</h3>
                            <p className="mb-2">
                                Price: <span className="font-bold">{room.price}</span>
                            </p>
                            <p className={`text-lg ${room.available ? 'text-green-500' : 'text-red-500'}`}>
                                {room.available ? 'Available' : 'Not Available'}
                            </p>
                            {room.available && (
                                <button
                                    onClick={() => handleBooking(room)}
                                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition"
                                >
                                    Book Now
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Show booking status */}
                {bookingStatus && (
                    <div className="mt-8 text-xl font-semibold text-blue-500">
                        {bookingStatus}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Room;
