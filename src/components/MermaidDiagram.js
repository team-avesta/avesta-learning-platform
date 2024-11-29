import React, { useEffect, useRef, forwardRef } from 'react';
import mermaid from 'mermaid';

const MermaidDiagram = forwardRef(({ code, zoomLevel, setZoomLevel, isSolution }, ref) => {
    const internalRef = useRef(null);
    const diagramRef = ref || internalRef;
    const diagramId = isSolution ? 'solution-diagram' : 'main-diagram';

    useEffect(() => {
        if (diagramRef.current) {
            if (!code.trim()) {
                diagramRef.current.innerHTML = `
                    <div class="flex items-center justify-center h-full">
                        <p class="text-gray-500 text-lg">
                            Start typing your Mermaid code in the editor to see the diagram here.
                        </p>
                    </div>
                `;
            } else {
                // Suppress console errors
                const originalConsoleError = console.error;
                console.error = () => { };

                mermaid.render(diagramId, code, diagramRef.current).then((result) => {
                    diagramRef.current.innerHTML = result.svg;
                    applyZoom();
                }).catch(() => {
                    diagramRef.current.innerHTML = `
                        <div class="flex items-center justify-center h-full">
                            <p class="text-red-500 text-lg">
                                Oops! There seems to be an issue with the diagram code. 
                                Please check your syntax and try again.
                            </p>
                        </div>
                    `;
                }).finally(() => {
                    // Restore console.error
                    console.error = originalConsoleError;
                });

                // Remove the additional error div
                const errorDiv = document.querySelector('.mermaid > .error');
                if (errorDiv) {
                    errorDiv.remove();
                }
            }
        }
    }, [code, zoomLevel, diagramId]);

    const applyZoom = () => {
        if (diagramRef.current) {
            diagramRef.current.style.transform = `scale(${zoomLevel})`;
            diagramRef.current.style.transformOrigin = 'top left';
        }
    };

    return (
        <div className="h-full" ref={diagramRef}></div>
    );
});

export default MermaidDiagram;
