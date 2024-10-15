import React, { useState } from 'react';
import { FaPlus, FaCheck, FaLightbulb } from 'react-icons/fa';

const MenuBar = ({ onAddClass, onAddInterface, onAddRelationship, onCompareMermaidCode, onShowSolution }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    return (
        <div className="inline-flex bg-gray-100 rounded-lg shadow-lg p-1 space-x-1 border border-gray-300">
            <div className="relative">
                <button
                    onClick={toggleDropdown}
                    className="text-gray-700 hover:bg-gray-200 p-2 rounded-l-md transition-colors duration-200 focus:outline-none"
                    title="Add Element"
                >
                    <FaPlus />
                </button>
                {showDropdown && (
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <button onClick={() => { onAddClass(); toggleDropdown(); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left">
                                Add Class
                            </button>
                            <button onClick={() => { onAddInterface(); toggleDropdown(); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left">
                                Add Interface
                            </button>
                            <button onClick={() => { onAddRelationship(); toggleDropdown(); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left">
                                Add Relationship
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <button
                onClick={onCompareMermaidCode}
                className="text-gray-700 hover:bg-gray-200 p-2 transition-colors duration-200 focus:outline-none"
                title="Submit Design"
            >
                <FaCheck />
            </button>
            <button
                onClick={onShowSolution}
                className="text-gray-700 hover:bg-gray-200 p-2 rounded-r-md transition-colors duration-200 focus:outline-none"
                title="Show Solution"
            >
                <FaLightbulb />
            </button>
        </div>
    );
};

export default MenuBar;
