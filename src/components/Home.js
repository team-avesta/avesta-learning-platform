import React from 'react';
import Header from './Header';
import CollapsibleMenu from './CollapsibleMenu';
import WelcomeSection from './WelcomeSection';
import CourseCatalog from './CourseCatalog';

const Home = () => {
    const userName = "John"; // This should be fetched from user data

    return (
        <div className="flex flex-col h-screen">
            <Header title="Design Learning Platform" />
            <div className="flex flex-1 overflow-hidden">
                <CollapsibleMenu />
                {/* Main Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <WelcomeSection userName={userName} />
                    <CourseCatalog />
                </div>
            </div>
        </div>
    );
};

export default Home;
