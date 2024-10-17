import React, { useState, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/language';
import { FaPlus, FaCheck, FaLightbulb, FaCube, FaProjectDiagram, FaArrowsAltH } from 'react-icons/fa';
import { compareCodes } from '../utils/MermaidComparator';

// Define a simple Mermaid language mode
const mermaidLanguage = StreamLanguage.define({
    token: function (stream, state) {
        if (stream.match(/%%/)) {
            stream.skipToEnd();
            return "comment";
        }
        if (stream.match(/\b(class|classDiagram|interface|enum)\b/)) {
            return "keyword";
        }
        if (stream.match(/[A-Z]\w*/)) {
            return "variable-2";  // Class names
        }
        if (stream.match(/[a-z]\w*/)) {
            return "variable";    // Method and property names
        }
        if (stream.match(/"/)) {
            while (!stream.eol()) {
                if (stream.next() === '"') break;
            }
            return "string";
        }
        if (stream.match(/\d+/)) {
            return "number";
        }
        if (stream.match(/[{}[\]()<>]/)) {
            return "bracket";
        }
        if (stream.match(/[+\-*/=<>!]+/)) {
            return "operator";
        }
        if (stream.match(/[,:]/)) {
            return "punctuation";
        }
        stream.next();
        return null;
    }
});

const MermaidCodeEditor = ({ code, onChange, onAddClass, onAddInterface, onAddRelationship, onShowSolution, solutionCode, isExerciseActive }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [comparisonResult, setComparisonResult] = useState(null);
    const [highlightedCode, setHighlightedCode] = useState('');

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    const compareMermaidCode = useCallback(() => {
        console.log("Comparing codes:");
        console.log("User code:", code);
        console.log("Solution code:", solutionCode);
        const result = compareCodes(solutionCode, code);
        console.log("Comparison result:", result);
        setComparisonResult(result);
        if (!result.identical) {
            highlightDifferences(result.differences, code);
        } else {
            setHighlightedCode('');
        }
    }, [solutionCode, code]);

    const highlightDifferences = useCallback((differences, comparisonCode) => {
        console.log("Highlighting differences:", differences);
        const lines = comparisonCode.split('\n');
        const highlightedLines = lines.map((line, index) => {
            const lineNumber = index + 1;
            const diff = differences.find(d => {
                // Check for each type of difference
                if (d.type === 'classes_missing' && d.missingClasses) {
                    return d.missingClasses.some(className => line.includes(className));
                }
                if (d.type === 'classes_added' && d.addedClasses) {
                    return d.addedClasses.some(className => line.includes(className));
                }
                if (d.type === 'properties_missing' || d.type === 'methods_missing') {
                    return line.includes(d.className);
                }
                if (d.type === 'property_changed') {
                    return line.includes(d.className) && line.includes(d.propertyName);
                }
                if (d.type === 'relationships_missing' && d.missingRelationships) {
                    return d.missingRelationships.some(r => line.includes(r.from) && line.includes(r.to));
                }
                if (d.type === 'relationships_added' && d.addedRelationships) {
                    return d.addedRelationships.some(r => line.includes(r.from) && line.includes(r.to));
                }
                return false;
            });
            if (diff) {
                console.log(`Highlighting line ${lineNumber}:`, line);
                const highlightColor = diff.type.includes('missing') ? 'yellow' : 'lightcoral';
                return `<span style="background-color: ${highlightColor};">${line}</span>`;
            }
            return line;
        });
        setHighlightedCode(highlightedLines.join('\n'));
    }, []);

    const closeComparisonResult = () => {
        setComparisonResult(null);
        setHighlightedCode('');
    };

    return (
        <div className="flex flex-col h-full">
            <div className="h-12 flex items-center justify-between px-4 bg-gray-100 border-b border-gray-300">
                <h2 className="text-xl font-bold text-gray-800">Code Editor</h2>
                <div className="flex space-x-1">
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="text-gray-700 hover:bg-gray-200 p-2 rounded-l-md transition-colors duration-200 focus:outline-none"
                            title="Add Element"
                        >
                            <FaPlus />
                        </button>
                        {showDropdown && (
                            <div className="fixed mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" style={{ zIndex: 9999 }}>
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    <button onClick={() => { onAddClass(); toggleDropdown(); }} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full">
                                        <FaCube className="mr-2" /> Add Class
                                    </button>
                                    <button onClick={() => { onAddInterface(); toggleDropdown(); }} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full">
                                        <FaProjectDiagram className="mr-2" /> Add Interface
                                    </button>
                                    <button onClick={() => { onAddRelationship(); toggleDropdown(); }} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full">
                                        <FaArrowsAltH className="mr-2" /> Add Relationship
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={compareMermaidCode}
                        className={`text-gray-700 hover:bg-gray-200 p-2 transition-colors duration-200 focus:outline-none ${!isExerciseActive && 'opacity-50 cursor-not-allowed'}`}
                        title="Submit Design"
                        disabled={!isExerciseActive}
                    >
                        <FaCheck />
                    </button>
                    <button
                        onClick={onShowSolution}
                        className={`text-gray-700 hover:bg-gray-200 p-2 rounded-r-md transition-colors duration-200 focus:outline-none ${!isExerciseActive && 'opacity-50 cursor-not-allowed'}`}
                        title="Show Solution"
                        disabled={!isExerciseActive}
                    >
                        <FaLightbulb />
                    </button>
                </div>
            </div>
            <div className="flex-grow overflow-hidden bg-white rounded-lg p-4 mt-4" data-gramm_editor="false">
                <CodeMirror
                    value={code}
                    height="100%"
                    extensions={[mermaidLanguage]}
                    onChange={onChange}
                    className="h-full overflow-auto"
                    theme="light"
                />
            </div>
            {comparisonResult && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
                    <div className="bg-white p-5 rounded-lg w-11/12 max-w-2xl max-h-[90vh] overflow-auto">
                        <h2 className="text-xl font-bold mb-4">Comparison Results</h2>
                        {comparisonResult.identical ? (
                            <p className="text-green-600 font-semibold">Your code matches the solution. Great job!</p>
                        ) : (
                            <>
                                <ul className="list-disc pl-5 mb-4">
                                    {comparisonResult.differences.map((diff, index) => (
                                        <li key={index} className="mb-2">{diff.message}</li>
                                    ))}
                                </ul>
                                <div className="border rounded p-4 bg-gray-100">
                                    <h3 className="font-bold mb-2">Your Code (Highlighted Differences):</h3>
                                    <pre className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: highlightedCode }}></pre>
                                </div>
                            </>
                        )}
                        <button
                            onClick={closeComparisonResult}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MermaidCodeEditor;
