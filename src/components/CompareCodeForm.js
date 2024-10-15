import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';

const CompareCodeForm = ({ onSubmit, onClose, currentCode }) => {
    const [codeToCompare, setCodeToCompare] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(codeToCompare);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center" onClick={onClose}>
            <div className="bg-white p-5 rounded-lg w-3/4 h-3/4" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4">Compare Mermaid Code</h2>
                <form onSubmit={handleSubmit} className="h-full flex flex-col">
                    <div className="flex-grow mb-4">
                        <CodeMirror
                            value={codeToCompare}
                            height="100%"
                            onChange={(value) => setCodeToCompare(value)}
                            className="h-full overflow-auto"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Compare</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompareCodeForm;