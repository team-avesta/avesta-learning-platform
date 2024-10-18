import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MermaidEditor from './MermaidEditor';

const CourseArea = () => {
    const location = useLocation();
    const { lessonTitle, markdownPath, exercises } = location.state || {};

    const [currentExercise, setCurrentExercise] = useState(null);

    const updateCurrentExercise = (exerciseIndex) => {
        setCurrentExercise(exerciseIndex !== null ? exercises[exerciseIndex] : null);
    };

    const handleCloseExercise = () => {
        setCurrentExercise(null);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow overflow-auto">
                <MermaidEditor
                    lessonTitle={lessonTitle || 'Lesson Content'}
                    markdownPath={markdownPath || ''}
                    exercises={exercises || []}
                    onExerciseStart={updateCurrentExercise}
                    onExerciseClose={handleCloseExercise}
                    currentExercise={currentExercise}
                />
            </div>
            <footer className="bg-gray-200 h-16 flex items-center justify-between px-4 text-sm">
                <div className="flex-grow overflow-hidden">
                    <p className="text-xs font-semibold truncate">{lessonTitle || 'Current Lesson'}</p>
                    {currentExercise && (
                        <p className="text-xs text-white bg-blue-500 px-2 py-1 rounded animate-pulse truncate max-w-[200px] mt-1">
                            {currentExercise.title || `Exercise ${exercises.indexOf(currentExercise) + 1}`}
                        </p>
                    )}
                </div>
                <p className="text-xs">&copy; 2024 Design Learning Platform</p>
            </footer>
        </div>
    );
};

export default CourseArea;
