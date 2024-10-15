import { useState, useCallback, useRef } from 'react';

const useResizable = (initialWidth, minWidth = 100, maxWidth = Infinity) => {
    const [width, setWidth] = useState(initialWidth);
    const [isResizing, setIsResizing] = useState(false);
    const startXRef = useRef(0);
    const startWidthRef = useRef(0);

    const startResizing = useCallback((e) => {
        setIsResizing(true);
        startXRef.current = e.clientX;
        startWidthRef.current = width;
    }, [width]);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = useCallback((e) => {
        if (isResizing) {
            const diff = e.clientX - startXRef.current;
            const newWidth = startWidthRef.current + diff;
            if (newWidth >= minWidth && newWidth <= maxWidth) {
                setWidth(newWidth);
            }
        }
    }, [isResizing, minWidth, maxWidth]);

    return { width, isResizing, startResizing, stopResizing, resize };
};

export default useResizable;
