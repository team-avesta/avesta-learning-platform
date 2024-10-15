import React from 'react';
import { FaPencilRuler } from 'react-icons/fa';

const Header = ({ title }) => {
    return (
        <header className="bg-blue-600 text-white p-4 flex items-center shadow-md">
            <FaPencilRuler className="text-3xl mr-3 text-yellow-300" />
            <h1 className="text-2xl font-bold">{title}</h1>
        </header>
    );
};

export default Header;
