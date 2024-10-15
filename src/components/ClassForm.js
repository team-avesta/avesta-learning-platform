import React, { useState, useEffect } from 'react';

const ClassForm = ({ onSubmit, onClose }) => {
    const [className, setClassName] = useState('');
    const [attributes, setAttributes] = useState([{ visibility: 'public', name: '', type: '' }]);
    const [methods, setMethods] = useState([{ visibility: 'public', name: '', returnType: '' }]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let classCode = `class ${className}`;

        const hasAttributes = attributes.some(attr => attr.name.trim() !== '' || attr.type.trim() !== '');
        const hasMethods = methods.some(method => method.name.trim() !== '' || method.returnType.trim() !== '');

        if (hasAttributes || hasMethods) {
            classCode += ' {\n';
            if (hasAttributes) {
                classCode += attributes
                    .filter(attr => attr.name.trim() !== '' || attr.type.trim() !== '')
                    .map(attr => `    ${attr.visibility === 'private' ? '-' : '+'}${attr.name}${attr.type ? ': ' + attr.type : ''}`)
                    .join('\n');
                classCode += '\n';
            }
            if (hasMethods) {
                if (hasAttributes) classCode += '\n';
                classCode += methods
                    .filter(method => method.name.trim() !== '' || method.returnType.trim() !== '')
                    .map(method => `    ${method.visibility === 'private' ? '-' : '+'}${method.name}()${method.returnType ? ': ' + method.returnType : ''}`)
                    .join('\n');
                classCode += '\n';
            }
            classCode += '}';
        }

        onSubmit(classCode);
    };

    const addAttribute = () => {
        setAttributes([...attributes, { visibility: 'public', name: '', type: '' }]);
    };

    const addMethod = () => {
        setMethods([...methods, { visibility: 'public', name: '', returnType: '' }]);
    };

    const handleInputChange = (e, index, field, type) => {
        const newArray = type === 'attribute' ? [...attributes] : [...methods];
        newArray[index][field] = e.target.value;
        type === 'attribute' ? setAttributes(newArray) : setMethods(newArray);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center" onClick={onClose}>
            <div className="bg-white p-5 rounded-lg w-96" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4">Add New Class</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        placeholder="Class Name"
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <h3 className="font-bold mb-2">Attributes</h3>
                    {attributes.map((attr, index) => (
                        <div key={index} className="flex mb-2">
                            <select
                                value={attr.visibility}
                                onChange={(e) => handleInputChange(e, index, 'visibility', 'attribute')}
                                className="w-1/4 p-2 mr-2 border rounded"
                            >
                                <option value="public">public</option>
                                <option value="private">private</option>
                            </select>
                            <input
                                type="text"
                                value={attr.name}
                                onChange={(e) => handleInputChange(e, index, 'name', 'attribute')}
                                placeholder="Attribute Name"
                                className="w-2/5 p-2 mr-2 border rounded"
                            />
                            <input
                                type="text"
                                value={attr.type}
                                onChange={(e) => handleInputChange(e, index, 'type', 'attribute')}
                                placeholder="Type"
                                className="w-1/3 p-2 border rounded"
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addAttribute} className="mb-4 text-blue-500">+ Add Attribute</button>
                    <h3 className="font-bold mb-2">Methods</h3>
                    {methods.map((method, index) => (
                        <div key={index} className="flex mb-2">
                            <select
                                value={method.visibility}
                                onChange={(e) => handleInputChange(e, index, 'visibility', 'method')}
                                className="w-1/4 p-2 mr-2 border rounded"
                            >
                                <option value="public">public</option>
                                <option value="private">private</option>
                            </select>
                            <input
                                type="text"
                                value={method.name}
                                onChange={(e) => handleInputChange(e, index, 'name', 'method')}
                                placeholder="Method Name"
                                className="w-2/5 p-2 mr-2 border rounded"
                            />
                            <input
                                type="text"
                                value={method.returnType}
                                onChange={(e) => handleInputChange(e, index, 'returnType', 'method')}
                                placeholder="Return Type"
                                className="w-1/3 p-2 border rounded"
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addMethod} className="mb-4 text-blue-500">+ Add Method</button>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Add Class</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClassForm;