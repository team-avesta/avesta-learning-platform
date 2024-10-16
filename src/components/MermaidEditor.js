import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import ClassForm from './ClassForm';
import InterfaceForm from './InterfaceForm';
import RelationshipForm from './RelationshipForm';
import MarkdownRenderer from './MarkdownRenderer';
import MermaidDiagram from './MermaidDiagram';
import MermaidCodeEditor from './MermaidCodeEditor';
import SolutionModal from './SolutionModal';
import { FaSearch, FaSearchMinus, FaSearchPlus } from 'react-icons/fa';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

const MermaidEditor = () => {
    const [code, setCode] = useState(`classDiagram
    class Animal {
        +String names
        +int age
        +makeSound()
    }
    class Dogs {
        +String breed
        +bark()
    }
    class Cat {
        +String color
        +meow()
    }
    Animal <|-- Dog
    Animal <|-- Cats`);
    const [diagramType, setDiagramType] = useState('mermaid');
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);
    const [showClassForm, setShowClassForm] = useState(false);
    const [showInterfaceForm, setShowInterfaceForm] = useState(false);
    const [showRelationshipForm, setShowRelationshipForm] = useState(false);
    const [showSolutionForm, setShowSolutionForm] = useState(false);
    const [solutionCode, setSolutionCode] = useState('');
    const [isSolutionDiagramExpanded, setIsSolutionDiagramExpanded] = useState(false);
    const [solutionZoomLevel, setSolutionZoomLevel] = useState(1);
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [markdownContent, setMarkdownContent] = useState('');
    const [diagramKey, setDiagramKey] = useState(0);
    const diagramRef = useRef(null);

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: false,
            securityLevel: 'loose',
            experimental: true,
        });

        // Set the solution code when the component mounts
        setSolutionCode(`classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +String breed
        +bark()
    }
    class Cat {
        +String color
        +meow()
    }
    Animal <|-- Dog
    Animal <|-- Cat`);

        // Load markdown content
        fetch('/markdown/lesson.md')
            .then(response => response.text())
            .then(text => {
                console.log('Loaded markdown content:', text); // For debugging
                setMarkdownContent(text);
            })
            .catch(error => console.error('Error loading markdown:', error));
    }, []);

    const handleCodeChange = (value) => {
        setCode(value);
        if (value.trim().toLowerCase().startsWith('zenuml')) {
            setDiagramType('zenuml');
        } else {
            setDiagramType('mermaid');
        }
    };

    const insertAtCursor = (insertion) => {
        const cursor = editorInstance.state.selection.main.head;
        const newCode = code.slice(0, cursor) + insertion + code.slice(cursor);
        setCode(newCode);
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

    const togglePreviewExpansion = () => {
        setIsPreviewExpanded(!isPreviewExpanded);
    };

    const showSolution = () => {
        console.log("Showing solution");
        // This is where you'd set your pre-written solution code
        const solution = `classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +String breed
        +bark()
    }
    class Cat {
        +String color
        +meow()
    }
    Animal <|-- Dog
    Animal <|-- Cat`;

        setSolutionCode(solution);
        setShowSolutionForm(true);
    };

    const handleSolutionClose = () => {
        console.log("Closing solution");
        setShowSolutionForm(false);
        // Force re-render of the diagram
        setDiagramKey(prevKey => prevKey + 1);
    };

    const toggleSolutionDiagramExpansion = () => {
        setIsSolutionDiagramExpanded(!isSolutionDiagramExpanded);
    };

    const solutionZoomIn = () => {
        setSolutionZoomLevel(prevZoom => Math.min(prevZoom + 0.1, 2));
    };

    const solutionZoomOut = () => {
        setSolutionZoomLevel(prevZoom => Math.max(prevZoom - 0.1, 0.5));
    };

    const zoomIn = () => setZoomLevel(prevZoom => Math.min(prevZoom + 0.1, 2));
    const zoomOut = () => setZoomLevel(prevZoom => Math.max(prevZoom - 0.1, 0.5));
    const resetZoom = () => setZoomLevel(1);

    return (
        <div className="flex flex-col h-full">
            {/* Main Content */}
            <PanelGroup direction="horizontal" className="flex-1">
                <Panel defaultSize={40} minSize={20}>
                    <div className="h-full flex flex-col">
                        <div className="h-12 flex items-center px-4 bg-gray-100 border-b border-gray-300">
                            <h2 className="text-xl font-bold text-gray-800">Lesson Content</h2>
                        </div>
                        <div className="flex-1 overflow-auto p-4">
                            <MarkdownRenderer content={markdownContent} />
                        </div>
                    </div>
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
                />
            )}
        </div>
    );
};

export default MermaidEditor;
