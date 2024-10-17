import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FaHome,
    FaBars,
    FaChevronLeft,
    FaGraduationCap,
    FaChevronDown,
    FaChevronRight,
} from 'react-icons/fa';
import CourseStructure from './CourseStructure';

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
