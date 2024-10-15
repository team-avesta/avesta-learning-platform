import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FaHome,
    FaPlayCircle,
    FaBars,
    FaChevronLeft,
    FaGraduationCap,
    FaChevronDown,
    FaChevronRight,
    FaCode,
    FaDatabase,
    FaCloud,
    FaNetworkWired,
    FaLock,
    FaMobileAlt,
    FaLightbulb,
    FaBook
} from 'react-icons/fa';

const CourseCard = ({ title, icon, isSelected, onClick }) => (
    <div
        className={`p-2 rounded-lg cursor-pointer flex items-center justify-center ${isSelected ? 'bg-blue-600 text-white' : 'bg-blue-200 text-blue-800 hover:bg-blue-300'
            } w-24 h-24 flex-col`}
        onClick={onClick}
        title={title} // This adds the tooltip
    >
        {icon}
        <span className="mt-2 text-center text-sm truncate w-full">{title}</span>
    </div>
);

const CourseStructure = ({ isOpen, onToggle }) => {
    const [expandedModules, setExpandedModules] = useState({});
    const [selectedCourse, setSelectedCourse] = useState('OOP Design');

    const toggleModule = (moduleId) => {
        setExpandedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
    };

    const courses = [
        { title: 'OOP Design', icon: <FaCode className="text-2xl" /> },
        { title: 'Database Design', icon: <FaDatabase className="text-2xl" /> },
        { title: 'Cloud Design', icon: <FaCloud className="text-2xl" /> },
        { title: 'Network Design', icon: <FaNetworkWired className="text-2xl" /> },
        { title: 'Security Design', icon: <FaLock className="text-2xl" /> },
        { title: 'Mobile App Design', icon: <FaMobileAlt className="text-2xl" /> },
    ];

    const courseStructures = {
        'OOP Design': [
            {
                id: 1,
                name: "Module 1: Introduction to Object-Oriented Programming",
                icon: <FaLightbulb className="text-yellow-300 mr-2" />,
                lessons: [
                    { name: "Lesson 1: What is OOP?", icon: <FaBook className="text-green-300 mr-2" /> },
                    { name: "Lesson 2: The Four Pillars of OOP", icon: <FaBook className="text-green-300 mr-2" /> },
                    { name: "Lesson 3: Classes and Objects", icon: <FaBook className="text-green-300 mr-2" /> },
                    { name: "Lesson 4: Constructors and Destructors", icon: <FaBook className="text-green-300 mr-2" /> }
                ]
            },
            {
                id: 2,
                name: "Module 2: Intermediate Concepts of OOP Design",
                icon: <FaCode className="text-blue-300 mr-2" />,
                lessons: [
                    { name: "Lesson 5: Inheritance", icon: <FaBook className="text-green-300 mr-2" /> },
                    { name: "Lesson 6: Polymorphism", icon: <FaBook className="text-green-300 mr-2" /> },
                    { name: "Lesson 7: Abstract Classes and Interfaces", icon: <FaBook className="text-green-300 mr-2" /> },
                    { name: "Lesson 8: Relationships in OOP", icon: <FaBook className="text-green-300 mr-2" /> }
                ]
            },
            {
                id: 3,
                name: "Module 3: Advanced OOP Design Patterns and Principles",
                icon: <FaGraduationCap className="text-purple-300 mr-2" />,
                lessons: [
                    { name: "Lesson 9: SOLID Principles", icon: <FaBook className="text-green-300 mr-2" /> },
                    { name: "Lesson 10: Design Patterns", icon: <FaBook className="text-green-300 mr-2" /> }
                ]
            }
        ],
        'Database Design': [
            {
                id: 1,
                name: "Module 1: Introduction to Database Design",
                icon: <FaLightbulb className="text-yellow-300 mr-2" />,
                lessons: [
                    { name: "Lesson 1: What is a Database?", icon: <FaBook className="text-green-300 mr-2" /> },
                    { name: "Lesson 2: Relational Database Concepts", icon: <FaBook className="text-green-300 mr-2" /> },
                ]
            },
            // Add more modules for Database Design
        ],
        'Cloud Design': [
            {
                id: 1,
                name: "Module 1: Introduction to Cloud Computing",
                icon: <FaLightbulb className="text-yellow-300 mr-2" />,
                lessons: [
                    { name: "Lesson 1: What is Cloud Computing?", icon: <FaBook className="text-green-300 mr-2" /> },
                    { name: "Lesson 2: Cloud Service Models", icon: <FaBook className="text-green-300 mr-2" /> },
                ]
            },
            // Add more modules for Cloud Design
        ],
    };

    if (!isOpen) return null;

    return (
        <div className="bg-blue-400 text-white p-2 w-80 flex flex-col h-full">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold flex items-center">
                    <FaGraduationCap className="mr-2" />
                    Course Structure
                </h3>
                <button onClick={onToggle} className="text-white">
                    <FaChevronLeft />
                </button>
            </div>
            <div className="overflow-y-auto flex-grow">
                <div className="grid grid-cols-3 gap-2 mb-4">
                    {courses.map((course) => (
                        <CourseCard
                            key={course.title}
                            title={course.title}
                            icon={course.icon}
                            isSelected={selectedCourse === course.title}
                            onClick={() => setSelectedCourse(course.title)}
                        />
                    ))}
                </div>
                {courseStructures[selectedCourse].map((module) => (
                    <div key={module.id} className="mb-2">
                        <div
                            className="flex justify-between items-center cursor-pointer hover:bg-blue-500 p-1 rounded"
                            onClick={() => toggleModule(module.id)}
                        >
                            <span className="flex items-center">
                                {module.icon}
                                {module.name}
                            </span>
                            {expandedModules[module.id] ? <FaChevronDown /> : <FaChevronRight />}
                        </div>
                        {expandedModules[module.id] && (
                            <ul className="pl-4 mt-1">
                                {module.lessons.map((lesson, index) => (
                                    <li key={index} className="hover:bg-blue-500 p-1 rounded flex items-center">
                                        {lesson.icon}
                                        {lesson.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const CollapsibleMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [isCourseStructureOpen, setIsCourseStructureOpen] = useState(false);

    return (
        <div className="flex h-full">
            <div className={`bg-blue-500 text-white ${isMenuOpen ? 'w-52' : 'w-12'} transition-all duration-300 ease-in-out flex flex-col`}>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="w-full p-3 text-left text-white hover:bg-blue-600 transition-colors duration-200 flex items-center justify-between"
                >
                    <span className="flex items-center">
                        <FaBars className={`${isMenuOpen ? 'mr-2' : ''}`} />
                        {isMenuOpen && "Menu"}
                    </span>
                    {isMenuOpen && <FaChevronLeft />}
                </button>
                <nav className="flex-grow overflow-y-auto">
                    <ul>
                        <li>
                            <Link to="/home" className={`w-full p-3 text-white hover:bg-blue-600 transition-colors duration-200 flex items-center ${isMenuOpen ? 'justify-start' : 'justify-center'}`}>
                                <FaHome className={isMenuOpen ? 'mr-2' : ''} />
                                {isMenuOpen && "Home"}
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={() => setIsCourseStructureOpen(!isCourseStructureOpen)}
                                className={`w-full p-3 text-white hover:bg-blue-600 transition-colors duration-200 flex items-center ${isMenuOpen ? 'justify-between' : 'justify-center'}`}
                            >
                                <span className="flex items-center">
                                    <FaGraduationCap className={isMenuOpen ? 'mr-2' : ''} />
                                    {isMenuOpen && "Courses"}
                                </span>
                                {isMenuOpen && (isCourseStructureOpen ? <FaChevronDown /> : <FaChevronRight />)}
                            </button>
                        </li>
                        <li>
                            <Link to="/playground" className={`w-full p-3 text-white hover:bg-blue-600 transition-colors duration-200 flex items-center ${isMenuOpen ? 'justify-start' : 'justify-center'}`}>
                                <FaPlayCircle className={isMenuOpen ? 'mr-2' : ''} />
                                {isMenuOpen && "Playground"}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            {isMenuOpen && (
                <CourseStructure
                    isOpen={isCourseStructureOpen}
                    onToggle={() => setIsCourseStructureOpen(!isCourseStructureOpen)}
                />
            )}
        </div>
    );
};

export default CollapsibleMenu;
