import React from 'react'

const Contact = () => {
    return (
        <div className="w-11/12 mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
            <p className="text-center text-gray-600 mb-8">
                If you have any questions, feel free to reach out to us!
            </p>
            <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md">
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Name</label>
                        <input type="text" className="w-full border p-2 rounded" placeholder="Enter your name" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input type="email" className="w-full border p-2 rounded" placeholder="Enter your email" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Message</label>
                        <textarea className="w-full border p-2 rounded" rows="4" placeholder="Write your message" required></textarea>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Contact