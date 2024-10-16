import React from 'react';
import WelcomeSection from './WelcomeSection';
import CourseCatalog from './CourseCatalog';

const Home = () => {
    const userName = "John"; // This should be fetched from user data

    return (
        <div className="p-6">
            <WelcomeSection userName={userName} />
            <CourseCatalog />
        </div>
    );
};

export default Home;
