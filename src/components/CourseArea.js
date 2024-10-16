import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import MermaidEditor from './MermaidEditor';

const CourseArea = () => {
    const location = useLocation();
    const { lessonTitle, markdownPath } = location.state || {};

    console.log('CourseArea state:', location.state); // Add this line
    console.log('Lesson title:', lessonTitle); // Add this line
    console.log('Markdown path:', markdownPath); // Add this line

    return (
        <div className="h-full">
            <MermaidEditor lessonTitle={lessonTitle || 'Lesson Content'} markdownPath={markdownPath || ''} />
        </div>
    );
};

export default CourseArea;
