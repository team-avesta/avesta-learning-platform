import React, { useState, useEffect } from 'react';
import { useCollapse } from 'react-collapsed';
import MarkdownRenderer from './MarkdownRenderer';
import { FaChevronDown, FaChevronUp, FaPlay } from 'react-icons/fa';

const AccordionItem = ({ title, content, isOpen, onToggle, isExercise, onStartExercise }) => {
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded: isOpen });

    return (
        <div className="border-b border-gray-200">
            <div className="flex items-center w-full p-4 text-left text-gray-800 hover:bg-gray-100">
                <button
                    {...getToggleProps({
                        onClick: onToggle,
                        className: "flex-grow flex justify-between items-center"
                    })}
                >
                    <span>{title}</span>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {isExercise && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onStartExercise();
                        }}
                        className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 rounded flex items-center justify-center"
                        title="Start Exercise"
                    >
                        <FaPlay />
                    </button>
                )}
            </div>
            <div {...getCollapseProps()}>
                <div className="p-4">
                    <MarkdownRenderer content={content} />
                </div>
            </div>
        </div>
    );
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm, exerciseTitle }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
                <h3 className="text-lg font-bold mb-4">Start Exercise</h3>
                <p className="mb-4">Are you ready to start "{exerciseTitle}"?</p>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Start
                    </button>
                </div>
            </div>
        </div>
    );
};

const LessonContentPanel = ({ lessonTitle, markdownPath, exercises = [], onStartExercise }) => {
    const [lessonContent, setLessonContent] = useState('');
    const [exerciseContents, setExerciseContents] = useState([]);
    const [openAccordionIndex, setOpenAccordionIndex] = useState(0);
    const [markdownError, setMarkdownError] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(null);

    useEffect(() => {
        const fetchContent = async (path) => {
            const absolutePath = path.startsWith('/') ? path : `/${path}`;
            const response = await fetch(absolutePath);
            if (!response.ok) {
                throw new Error(`Failed to load content from ${absolutePath}`);
            }
            return response.text();
        };

        const loadContents = async () => {
            try {
                if (markdownPath) {
                    const lessonText = await fetchContent(markdownPath);
                    setLessonContent(lessonText);
                }

                if (exercises && exercises.length > 0) {
                    const exerciseTexts = await Promise.all(
                        exercises.map(exercise => fetchContent(exercise.markdownPath))
                    );
                    setExerciseContents(exerciseTexts);
                } else {
                    setExerciseContents([]);
                }

                setMarkdownError(null);
            } catch (error) {
                console.error('Error loading content:', error);
                setMarkdownError('Failed to load content. Please try again later.');
                setLessonContent('');
                setExerciseContents([]);
            }
        };

        loadContents();
    }, [markdownPath, exercises]);

    const handleStartExercise = async (index) => {
        setSelectedExerciseIndex(index);
        setShowConfirmation(true);
    };

    const confirmStartExercise = async () => {
        setShowConfirmation(false);
        const index = selectedExerciseIndex;
        console.log(`Starting exercise ${index + 1}`);
        const exercise = exercises[index];
        if (exercise && exercise.solution) {
            try {
                const absoluteSolutionPath = exercise.solution.startsWith('/') ? exercise.solution : `/${exercise.solution}`;
                const solutionContent = await fetch(absoluteSolutionPath).then(res => res.text());

                const mermaidCodeMatch = solutionContent.match(/```mermaid\s*([\s\S]*?)\s*```/) || solutionContent.match(/classDiagram\s*([\s\S]*)/);

                if (mermaidCodeMatch) {
                    let mermaidCode = mermaidCodeMatch[1].trim();

                    if (!mermaidCode.startsWith('classDiagram')) {
                        mermaidCode = 'classDiagram\n' + mermaidCode;
                    }

                    onStartExercise(mermaidCode, index);
                } else {
                    console.error('No Mermaid code found in the solution file');
                }
            } catch (error) {
                console.error('Error loading solution:', error);
            }
        } else {
            console.error('No solution file found for this exercise');
        }
    };

    return (
        <div className="h-full flex flex-col">
            <div className="h-12 flex items-center px-4 bg-gray-100 border-b border-gray-300">
                <h2 className="text-xl font-bold text-gray-800">{lessonTitle}</h2>
            </div>
            <div className="flex-1 overflow-auto">
                {markdownError ? (
                    <div className="text-red-500 p-4">{markdownError}</div>
                ) : (
                    <div className="bg-white shadow-md rounded-md overflow-hidden">
                        <AccordionItem
                            title="Lesson Content"
                            content={lessonContent}
                            isOpen={openAccordionIndex === 0}
                            onToggle={() => setOpenAccordionIndex(openAccordionIndex === 0 ? -1 : 0)}
                            isExercise={false}
                        />
                        {exerciseContents.map((content, index) => (
                            <AccordionItem
                                key={index}
                                title={exercises[index]?.title || `Exercise ${index + 1}`}
                                content={content}
                                isOpen={openAccordionIndex === index + 1}
                                onToggle={() => setOpenAccordionIndex(openAccordionIndex === index + 1 ? -1 : index + 1)}
                                isExercise={true}
                                onStartExercise={() => handleStartExercise(index)}
                            />
                        ))}
                    </div>
                )}
            </div>
            <ConfirmationModal
                isOpen={showConfirmation}
                onClose={() => setShowConfirmation(false)}
                onConfirm={confirmStartExercise}
                exerciseTitle={exercises[selectedExerciseIndex]?.title || `Exercise ${selectedExerciseIndex + 1}`}
            />
        </div>
    );
};

export default LessonContentPanel;
