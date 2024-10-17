import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import MermaidEditor from './MermaidEditor';

const CourseArea = () => {
    const location = useLocation();
    const { lessonTitle, markdownPath, exercises } = location.state || {};

    console.log('CourseArea state:', location.state);
    console.log('Lesson title:', lessonTitle);
    console.log('Markdown path:', markdownPath);
    console.log('Exercises:', exercises);

    return (
        <div className="h-full">
            <MermaidEditor
                lessonTitle={lessonTitle || 'Lesson Content'}
                markdownPath={markdownPath || ''}
                exercises={exercises || []}
            />
        </div>
    );
};

export default CourseArea;
