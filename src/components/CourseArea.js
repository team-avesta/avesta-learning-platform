import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MermaidEditor from './MermaidEditor';

const CourseArea = () => {
    const { moduleId, lessonId } = useParams();
    const [lessonTitle, setLessonTitle] = useState('Lesson Content');

    useEffect(() => {
        const fetchLessonTitle = async () => {
            try {
                const response = await fetch('/mock/oops-course-structure.json');
                const data = await response.json();
                const module = data.modules[moduleId];
                const lesson = module.lessons[lessonId];
                setLessonTitle(lesson.title);
            } catch (error) {
                console.error('Error fetching lesson title:', error);
            }
        };

        fetchLessonTitle();
    }, [moduleId, lessonId]);

    return (
        <div className="h-full">
            <MermaidEditor lessonTitle={lessonTitle} />
        </div>
    );
};

export default CourseArea;
