import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import MermaidDiagram from './MermaidDiagram';
import { FaSearch, FaSearchMinus, FaSearchPlus } from 'react-icons/fa';

const SolutionModal = ({
    solutionCode,
    isSolutionDiagramExpanded,
    toggleSolutionDiagramExpansion,
    solutionZoomLevel,
    setSolutionZoomLevel,
    handleSolutionClose
}) => {
    const solutionZoomIn = () => setSolutionZoomLevel(prevZoom => Math.min(prevZoom + 0.1, 2));
    const solutionZoomOut = () => setSolutionZoomLevel(prevZoom => Math.max(prevZoom - 0.1, 0.5));

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-[9999]">
            <div className="bg-white p-5 rounded-lg w-11/12 h-5/6 flex flex-col">
                <h2 className="text-2xl font-bold mb-4">Solution</h2>
                <div className="flex-grow flex overflow-hidden">
                    <div className={`${isSolutionDiagramExpanded ? 'hidden' : 'w-1/2'} pr-2 flex flex-col transition-all duration-300`}>
                        <div className="h-12 flex items-center px-4 bg-gray-100 border-b border-gray-300">
                            <h3 className="text-xl font-bold text-gray-800">Solution Code</h3>
                        </div>
                        <div className="flex-1 overflow-auto">
                            <CodeMirror
                                value={solutionCode}
                                height="100%"
                                readOnly={true}
                                className="h-full"
                            />
                        </div>
                    </div>
                    <button
                        onClick={toggleSolutionDiagramExpansion}
                        className="w-6 bg-gray-300 hover:bg-gray-400 flex items-center justify-center cursor-pointer transition-all duration-300"
                    >
                        {isSolutionDiagramExpanded ? '◀' : '▶'}
                    </button>
                    <div className={`${isSolutionDiagramExpanded ? 'w-full' : 'w-1/2'} pl-2 flex flex-col transition-all duration-300`}>
                        <div className="h-12 flex items-center justify-between px-4 bg-gray-100 border-b border-gray-300">
                            <h3 className="text-xl font-bold text-gray-800">Solution Diagram</h3>
                            <div className="flex space-x-1">
                                <button
                                    onClick={solutionZoomIn}
                                    className="text-gray-700 hover:bg-gray-200 p-2 rounded-l-md transition-colors duration-200 focus:outline-none"
                                    title="Zoom In"
                                >
                                    <FaSearchPlus />
                                </button>
                                <button
                                    onClick={() => setSolutionZoomLevel(1)}
                                    className="text-gray-700 hover:bg-gray-200 p-2 transition-colors duration-200 focus:outline-none"
                                    title="Reset Zoom"
                                >
                                    <FaSearch />
                                </button>
                                <button
                                    onClick={solutionZoomOut}
                                    className="text-gray-700 hover:bg-gray-200 p-2 rounded-r-md transition-colors duration-200 focus:outline-none"
                                    title="Zoom Out"
                                >
                                    <FaSearchMinus />
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-auto">
                            <MermaidDiagram code={solutionCode} zoomLevel={solutionZoomLevel} setZoomLevel={setSolutionZoomLevel} />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <button onClick={handleSolutionClose} className="px-4 py-2 bg-blue-500 text-white rounded">Close</button>
                </div>
            </div>
        </div>
    );
};

export default SolutionModal;
