import React from 'react';
import { FaPlay, FaPlus, FaChartBar } from 'react-icons/fa';

const WelcomeSection = ({ userName }) => {
    const progress = 65; // This should be fetched from user data

    return (
        <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Welcome back, {userName}!</h2>
            <div className="bg-gray-200 h-4 rounded-full mb-6">
                <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: `${progress}%` }}
                    title={`${progress}% complete`}
                ></div>
            </div>
            <div className="flex space-x-4">
                <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                    <FaPlay className="mr-2" /> Resume Last Course
                </button>
                <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                    <FaPlus className="mr-2" /> Start a New Course
                </button>
                <button className="flex items-center bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors">
                    <FaChartBar className="mr-2" /> View Dashboard
                </button>
            </div>
        </section>
    );
};

export default WelcomeSection;
