import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import ClassForm from './ClassForm';
import InterfaceForm from './InterfaceForm';
import RelationshipForm from './RelationshipForm';
import MermaidDiagram from './MermaidDiagram';
import MermaidCodeEditor from './MermaidCodeEditor';
import SolutionModal from './SolutionModal';
import LessonContentPanel from './LessonContentPanel';
import { FaSearch, FaSearchMinus, FaSearchPlus } from 'react-icons/fa';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

const MermaidEditor = ({ lessonTitle, markdownPath, exercises }) => {
    console.log('MermaidEditor props:', { lessonTitle, markdownPath, exercises });

    const [code, setCode] = useState(''); // Start with an empty code editor
    const [diagramType, setDiagramType] = useState('mermaid');
    const [zoomLevel, setZoomLevel] = useState(1);
    const [showClassForm, setShowClassForm] = useState(false);
    const [showInterfaceForm, setShowInterfaceForm] = useState(false);
    const [showRelationshipForm, setShowRelationshipForm] = useState(false);
    const [showSolutionForm, setShowSolutionForm] = useState(false);
    const [solutionCode, setSolutionCode] = useState('');
    const [isSolutionDiagramExpanded, setIsSolutionDiagramExpanded] = useState(false);
    const [solutionZoomLevel, setSolutionZoomLevel] = useState(1);
    const [diagramKey, setDiagramKey] = useState(0);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(null);
    const diagramRef = useRef(null);

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: false,
            securityLevel: 'loose',
            experimental: true,
        });
    }, []);

    const handleCodeChange = (value) => {
        setCode(value);
        if (value.trim().toLowerCase().startsWith('zenuml')) {
            setDiagramType('zenuml');
        } else {
            setDiagramType('mermaid');
        }
    };

    const addClass = () => {
        setShowClassForm(true);
    };

    const addInterface = () => {
        setShowInterfaceForm(true);
    };

    const addRelationship = () => {
        setShowRelationshipForm(true);
    };

    const handleClassSubmit = (classCode) => {
        setCode(prevCode => {
            const newLine = prevCode.endsWith('\n') ? '' : '\n';
            const formattedCode = `\n    ${classCode.replace(/\n/g, '\n    ')}`;
            return prevCode + newLine + formattedCode + '\n';
        });
        setShowClassForm(false);
    };

    const handleInterfaceSubmit = (interfaceCode) => {
        setCode(prevCode => {
            const newLine = prevCode.endsWith('\n') ? '' : '\n';
            const formattedCode = `\n    ${interfaceCode.replace(/\n/g, '\n    ')}`;
            return prevCode + newLine + formattedCode + '\n';
        });
        setShowInterfaceForm(false);
    };

    const handleRelationshipSubmit = (relationshipCode) => {
        setCode(prevCode => {
            const newLine = prevCode.endsWith('\n') ? '' : '\n';
            const formattedCode = `\n    ${relationshipCode}`;
            return prevCode + newLine + formattedCode + '\n';
        });
        setShowRelationshipForm(false);
    };

    const showSolution = () => {
        setShowSolutionForm(true);
    };

    const handleSolutionClose = () => {
        setShowSolutionForm(false);
        setDiagramKey(prevKey => prevKey + 1);
    };

    const toggleSolutionDiagramExpansion = () => {
        setIsSolutionDiagramExpanded(!isSolutionDiagramExpanded);
    };

    const zoomIn = () => setZoomLevel(prevZoom => Math.min(prevZoom + 0.1, 2));
    const zoomOut = () => setZoomLevel(prevZoom => Math.max(prevZoom - 0.1, 0.5));
    const resetZoom = () => setZoomLevel(1);

    const handleStartExercise = (solutionMermaidCode, exerciseIndex) => {
        setSolutionCode(solutionMermaidCode);
        setCurrentExerciseIndex(exerciseIndex);
        // Remove this line to prevent the solution window from opening immediately
        // setShowSolutionForm(true);

        // Optionally, you can clear the current code to give the user a clean slate
        setCode('');

        // You might want to add some visual feedback that the exercise has started
        console.log(`Exercise ${exerciseIndex + 1} started. Solution code loaded.`);
    };

    return (
        <div className="flex flex-col h-full">
            <PanelGroup direction="horizontal" className="flex-1">
                <Panel defaultSize={40} minSize={20}>
                    <LessonContentPanel
                        lessonTitle={lessonTitle}
                        markdownPath={markdownPath}
                        exercises={exercises}
                        onStartExercise={handleStartExercise}
                    />
                </Panel>
                <PanelResizeHandle className="w-1 bg-gray-300 cursor-col-resize z-10" />
                <Panel defaultSize={20} minSize={15}>
                    <MermaidCodeEditor
                        code={code}
                        onChange={handleCodeChange}
                        onAddClass={addClass}
                        onAddInterface={addInterface}
                        onAddRelationship={addRelationship}
                        onShowSolution={showSolution}
                        solutionCode={solutionCode}
                        isExerciseActive={currentExerciseIndex !== null}
                    />
                </Panel>
                <PanelResizeHandle className="w-1 bg-gray-300 cursor-col-resize z-10" />
                <Panel defaultSize={40} minSize={20}>
                    <div className="h-full flex flex-col">
                        <div className="h-12 flex items-center justify-between px-4 bg-gray-100 border-b border-gray-300">
                            <h2 className="text-xl font-bold text-gray-800">Diagram</h2>
                            <div className="flex space-x-1">
                                <button onClick={zoomIn} className="text-gray-700 hover:bg-gray-200 p-2 rounded-l-md transition-colors duration-200 focus:outline-none" title="Zoom In">
                                    <FaSearchPlus />
                                </button>
                                <button onClick={resetZoom} className="text-gray-700 hover:bg-gray-200 p-2 transition-colors duration-200 focus:outline-none" title="Reset Zoom">
                                    <FaSearch />
                                </button>
                                <button onClick={zoomOut} className="text-gray-700 hover:bg-gray-200 p-2 rounded-r-md transition-colors duration-200 focus:outline-none" title="Zoom Out">
                                    <FaSearchMinus />
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-auto p-4">
                            <MermaidDiagram
                                key={diagramKey}
                                code={code}
                                zoomLevel={zoomLevel}
                                setZoomLevel={setZoomLevel}
                                ref={diagramRef}
                            />
                        </div>
                    </div>
                </Panel>
            </PanelGroup>
            {/* Keep the modal components */}
            {showClassForm && (
                <div className="absolute inset-0 z-50">
                    <ClassForm
                        onSubmit={handleClassSubmit}
                        onClose={() => setShowClassForm(false)}
                    />
                </div>
            )}
            {showInterfaceForm && (
                <div className="absolute inset-0 z-50">
                    <InterfaceForm
                        onSubmit={handleInterfaceSubmit}
                        onClose={() => setShowInterfaceForm(false)}
                    />
                </div>
            )}
            {showRelationshipForm && (
                <div className="absolute inset-0 z-50">
                    <RelationshipForm
                        onSubmit={handleRelationshipSubmit}
                        onClose={() => setShowRelationshipForm(false)}
                    />
                </div>
            )}
            {showSolutionForm && (
                <SolutionModal
                    solutionCode={solutionCode}
                    isSolutionDiagramExpanded={isSolutionDiagramExpanded}
                    toggleSolutionDiagramExpansion={toggleSolutionDiagramExpansion}
                    solutionZoomLevel={solutionZoomLevel}
                    setSolutionZoomLevel={setSolutionZoomLevel}
                    handleSolutionClose={handleSolutionClose}
                    exerciseIndex={currentExerciseIndex}
                />
            )}
        </div>
    );
};

export default MermaidEditor;
