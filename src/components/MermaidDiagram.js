import React, { useEffect, useRef, forwardRef } from 'react';
import mermaid from 'mermaid';
import { FaSearch, FaSearchMinus, FaSearchPlus } from 'react-icons/fa';

const MermaidDiagram = forwardRef(({ code, zoomLevel, setZoomLevel }, ref) => {
    const internalRef = useRef(null);
    const diagramRef = ref || internalRef;

    useEffect(() => {
        console.log("MermaidDiagram useEffect triggered");
        if (diagramRef.current) {
            if (!code.trim()) {
                // Show a nice message when there's no code
                diagramRef.current.innerHTML = `
                    <div class="flex items-center justify-center h-full">
                        <p class="text-gray-500 text-lg">
                            Start typing your Mermaid code in the editor to see the diagram here.
                        </p>
                    </div>
                `;
            } else {
                console.log("Rendering diagram with code:", code);
                mermaid.render('diagram', code).then((result) => {
                    console.log("Diagram rendered successfully");
                    diagramRef.current.innerHTML = result.svg;
                    applyZoom();
                }).catch((error) => {
                    console.error('Mermaid error:', error);
                    // Show a user-friendly error message
                    diagramRef.current.innerHTML = `
                        <div class="flex items-center justify-center h-full">
                            <p class="text-red-500 text-lg">
                                Oops! There seems to be an issue with the diagram code. 
                                Please check your syntax and try again.
                            </p>
                        </div>
                    `;
                });
            }
        }
    }, [code, zoomLevel]);

    const applyZoom = () => {
        if (diagramRef.current) {
            diagramRef.current.style.transform = `scale(${zoomLevel})`;
            diagramRef.current.style.transformOrigin = 'top left';
        }
    };

    const zoomIn = () => setZoomLevel(prevZoom => Math.min(prevZoom + 0.1, 2));
    const zoomOut = () => setZoomLevel(prevZoom => Math.max(prevZoom - 0.1, 0.5));
    const resetZoom = () => setZoomLevel(1);

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="flex-grow overflow-auto">
                <div ref={diagramRef} className="h-full"></div>
            </div>
        </div>
    );
});

export default MermaidDiagram;
