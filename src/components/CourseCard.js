import React from 'react';
import { FaPlay } from 'react-icons/fa';

const CourseCard = ({ course }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">Level: {course.level}</p>
                <div className="flex items-center justify-between mb-4">
                    <div className="bg-gray-200 h-2 rounded-full flex-grow mr-4">
                        <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${course.progress}%` }}
                        ></div>
                    </div>
                    <span className="text-sm font-semibold">{course.progress}%</span>
                </div>
                <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center justify-center">
                    <FaPlay className="mr-2" />
                    {course.progress > 0 ? "Continue Course" : "Start Course"}
                </button>
            </div>
        </div>
    );
};

export default CourseCard;
