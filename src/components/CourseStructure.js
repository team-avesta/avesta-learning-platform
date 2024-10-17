import React, { useState, useEffect } from 'react';
import {
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
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ title, icon, isSelected, onClick }) => (
    <div
        className={`p-2 rounded-lg cursor-pointer flex items-center justify-center ${isSelected ? 'bg-blue-600 text-white' : 'bg-blue-200 text-blue-800 hover:bg-blue-300'
            } w-24 h-24 flex-col`}
        onClick={onClick}
        title={title}
    >
        {icon}
        <span className="mt-2 text-center text-sm truncate w-full">{title}</span>
    </div>
);

const CourseStructure = ({ isOpen, onToggle }) => {
    const navigate = useNavigate();
    const [expandedModules, setExpandedModules] = useState({});
    const [selectedCourse, setSelectedCourse] = useState('OOP Design');
    const [courseStructure, setCourseStructure] = useState(null);

    useEffect(() => {
        const fetchCourseStructure = async () => {
            try {
                const response = await fetch('/mock/oops-course-structure.json');
                const data = await response.json();
                setCourseStructure(data);
            } catch (error) {
                console.error('Error fetching course structure:', error);
            }
        };

        fetchCourseStructure();
    }, []);

    const toggleModule = (moduleId) => {
        setExpandedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
    };

    const handleLessonClick = (moduleIndex, lessonIndex) => {
        if (courseStructure) {
            const lesson = courseStructure.modules[moduleIndex].lessons[lessonIndex];
            console.log('Lesson clicked:', lesson);

            const absoluteMarkdownPath = lesson.markdownPath.startsWith('/') ? lesson.markdownPath : `/${lesson.markdownPath}`;
            console.log('Absolute Markdown path:', absoluteMarkdownPath);

            const exercises = lesson.exercises ? lesson.exercises.map(exercise => ({
                ...exercise,
                markdownPath: exercise.markdownPath.startsWith('/') ? exercise.markdownPath : `/${exercise.markdownPath}`,
                solution: exercise.solution.startsWith('/') ? exercise.solution : `/${exercise.solution}`
            })) : [];

            navigate(`/course/${moduleIndex}/${lessonIndex}`, {
                state: {
                    lessonTitle: lesson.title,
                    markdownPath: absoluteMarkdownPath,
                    exercises: exercises
                }
            });
        }
    };

    const courses = [
        { title: 'OOP Design', icon: <FaCode className="text-2xl" /> },
        { title: 'Database Design', icon: <FaDatabase className="text-2xl" /> },
        { title: 'Cloud Design', icon: <FaCloud className="text-2xl" /> },
        { title: 'Network Design', icon: <FaNetworkWired className="text-2xl" /> },
        { title: 'Security Design', icon: <FaLock className="text-2xl" /> },
        { title: 'Mobile App Design', icon: <FaMobileAlt className="text-2xl" /> },
    ];

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
                {courseStructure && selectedCourse === 'OOP Design' && (
                    <div>
                        {courseStructure.modules.map((module, moduleIndex) => (
                            <div key={moduleIndex} className="mb-2">
                                <div
                                    className="flex justify-between items-center cursor-pointer hover:bg-blue-500 p-1 rounded"
                                    onClick={() => toggleModule(moduleIndex)}
                                >
                                    <span className="flex items-center">
                                        <FaLightbulb className="text-yellow-300 mr-2" />
                                        {module.title}
                                    </span>
                                    {expandedModules[moduleIndex] ? <FaChevronDown /> : <FaChevronRight />}
                                </div>
                                {expandedModules[moduleIndex] && (
                                    <ul className="pl-4 mt-1">
                                        {module.lessons.map((lesson, lessonIndex) => (
                                            <li
                                                key={lessonIndex}
                                                className="hover:bg-blue-500 p-1 rounded flex items-center cursor-pointer"
                                                onClick={() => handleLessonClick(moduleIndex, lessonIndex)}
                                            >
                                                <FaBook className="text-green-300 mr-2" />
                                                {lesson.title}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseStructure;
