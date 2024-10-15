import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import CourseCard from './CourseCard';

const CourseCatalog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // This should be fetched from an API or database
    const courses = [
        { id: 1, title: "Object-Oriented Programming", category: "OOP Design", level: "Beginner", progress: 30 },
        { id: 2, title: "Database Design Fundamentals", category: "Database Design", level: "Intermediate", progress: 0 },
        { id: 3, title: "Cloud Architecture Patterns", category: "Cloud Design", level: "Advanced", progress: 75 },
        // Add more courses as needed
    ];

    const categories = ["All", "OOP Design", "Database Design", "Cloud Design"];

    const filteredCourses = courses.filter(course =>
        (selectedCategory === "All" || course.category === selectedCategory) &&
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section>
            <h2 className="text-2xl font-bold mb-6">Explore Courses</h2>
            <div className="flex justify-between mb-6">
                <div className="flex space-x-4">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`px-4 py-2 rounded ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        className="pl-10 pr-4 py-2 border rounded"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </section>
    );
};

export default CourseCatalog;
