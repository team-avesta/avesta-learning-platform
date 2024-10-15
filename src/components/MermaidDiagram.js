import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { FaSearch, FaSearchMinus, FaSearchPlus } from 'react-icons/fa';

const MermaidDiagram = ({ code, zoomLevel, setZoomLevel }) => {
    const diagramRef = useRef(null);

    useEffect(() => {
        if (diagramRef.current) {
            diagramRef.current.innerHTML = '';
            mermaid.render('diagram', code).then((result) => {
                diagramRef.current.innerHTML = result.svg;
                applyZoom();
            }).catch((error) => {
                console.error('Mermaid error:', error);
                diagramRef.current.innerHTML = '<p>Error rendering Mermaid diagram: ' + error.message + '</p>';
            });
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
                <div ref={diagramRef}></div>
            </div>
        </div>
    );
};

export default MermaidDiagram;
