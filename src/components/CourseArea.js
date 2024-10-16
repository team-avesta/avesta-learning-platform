import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MermaidEditor from './MermaidEditor';

const CourseArea = () => {
    const { moduleId, lessonId } = useParams();
    const [courseContent, setCourseContent] = useState(null);

    useEffect(() => {
        // Fetch course content based on moduleId and lessonId
        const fetchCourseContent = async () => {
            try {
                const response = await fetch('/mock/oops-course-structure.json');
                const data = await response.json();
                const module = data.modules[moduleId];
                const lesson = module.lessons[lessonId];
                setCourseContent({ module, lesson });
            } catch (error) {
                console.error('Error fetching course content:', error);
            }
        };

        fetchCourseContent();
    }, [moduleId, lessonId]);

    return (
        <div className="p-6">
            <div className="mb-6">
                {courseContent ? (
                    <>
                        <h2 className="text-2xl font-bold mb-4">{courseContent.module.title}</h2>
                        <h3 className="text-xl font-semibold mb-2">{courseContent.lesson.title}</h3>
                        <div className="prose max-w-none">
                            {/* Replace this with actual lesson content */}
                            <p>This is where the lesson content will go. It can include text, images, code snippets, etc.</p>
                        </div>
                    </>
                ) : (
                    <p>Loading course content...</p>
                )}
            </div>
            <div className="border-t pt-6">
                <h4 className="text-lg font-semibold mb-2">Lesson Exercise</h4>
                <MermaidEditor />
            </div>
        </div>
    );
};

export default CourseArea;
