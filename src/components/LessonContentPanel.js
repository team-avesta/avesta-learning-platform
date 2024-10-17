import React, { useState, useEffect } from 'react';
import { useCollapse } from 'react-collapsed';
import MarkdownRenderer from './MarkdownRenderer';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const AccordionItem = ({ title, content, isOpen, onToggle }) => {
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded: isOpen });

    return (
        <div className="border-b border-gray-200">
            <button
                {...getToggleProps({
                    onClick: onToggle,
                    className: "flex justify-between items-center w-full p-4 text-left text-gray-800 hover:bg-gray-100"
                })}
            >
                <span>{title}</span>
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            <div {...getCollapseProps()}>
                <div className="p-4">
                    <MarkdownRenderer content={content} />
                </div>
            </div>
        </div>
    );
};

const LessonContentPanel = ({ lessonTitle, markdownPath, exercisePaths }) => {
    const [lessonContent, setLessonContent] = useState('');
    const [exerciseContents, setExerciseContents] = useState([]);
    const [openAccordionIndex, setOpenAccordionIndex] = useState(0);
    const [markdownError, setMarkdownError] = useState(null);

    useEffect(() => {
        // Load lesson content
        if (markdownPath) {
            const absoluteMarkdownPath = markdownPath.startsWith('/') ? markdownPath : `/${markdownPath}`;

            fetch(absoluteMarkdownPath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to load lesson content');
                    }
                    return response.text();
                })
                .then(text => {
                    setLessonContent(text);
                    setMarkdownError(null);
                })
                .catch(error => {
                    console.error('Error loading lesson markdown:', error);
                    setMarkdownError('Failed to load lesson content. Please try again later.');
                    setLessonContent('');
                });
        } else {
            setLessonContent('');
            setMarkdownError('No lesson content available.');
        }

        // Load exercise contents
        if (exercisePaths && exercisePaths.length > 0) {
            Promise.all(exercisePaths.map(path => {
                const absolutePath = path.startsWith('/') ? path : `/${path}`;
                return fetch(absolutePath).then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to load exercise content from ${absolutePath}`);
                    }
                    return response.text();
                });
            }))
                .then(contents => {
                    setExerciseContents(contents);
                })
                .catch(error => {
                    console.error('Error loading exercise markdown:', error);
                    setMarkdownError('Failed to load exercise content. Please try again later.');
                    setExerciseContents([]);
                });
        }
    }, [markdownPath, exercisePaths]);

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
                        />
                        {exerciseContents.map((content, index) => (
                            <AccordionItem
                                key={index}
                                title={`Exercise ${index + 1}`}
                                content={content}
                                isOpen={openAccordionIndex === index + 1}
                                onToggle={() => setOpenAccordionIndex(openAccordionIndex === index + 1 ? -1 : index + 1)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LessonContentPanel;
