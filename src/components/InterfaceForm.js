import React, { useState, useEffect } from 'react';

const InterfaceForm = ({ onSubmit, onClose }) => {
    const [interfaceName, setInterfaceName] = useState('');
    const [methods, setMethods] = useState([{ name: '', returnType: '' }]);

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
        let interfaceCode = `class ${interfaceName}`;

        const hasMethods = methods.some(method => method.name.trim() !== '' || method.returnType.trim() !== '');

        if (hasMethods) {
            interfaceCode += ` {\n    <<interface>>\n`;
            interfaceCode += methods
                .filter(method => method.name.trim() !== '' || method.returnType.trim() !== '')
                .map(method => `    +${method.name}()${method.returnType ? ': ' + method.returnType : ''}`)
                .join('\n');
            interfaceCode += '\n}';
        } else {
            interfaceCode += ' {\n    <<interface>>\n}';
        }

        onSubmit(interfaceCode);
    };

    const addMethod = () => {
        setMethods([...methods, { name: '', returnType: '' }]);
    };

    const handleInputChange = (e, index, field) => {
        const newMethods = [...methods];
        newMethods[index][field] = e.target.value;
        setMethods(newMethods);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center" onClick={onClose}>
            <div className="bg-white p-5 rounded-lg w-96" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4">Add New Interface</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={interfaceName}
                        onChange={(e) => setInterfaceName(e.target.value)}
                        placeholder="Interface Name"
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <h3 className="font-bold mb-2">Methods</h3>
                    {methods.map((method, index) => (
                        <div key={index} className="flex mb-2">
                            <input
                                type="text"
                                value={method.name}
                                onChange={(e) => handleInputChange(e, index, 'name')}
                                placeholder="Method Name"
                                className="w-1/2 p-2 mr-2 border rounded"
                            />
                            <input
                                type="text"
                                value={method.returnType}
                                onChange={(e) => handleInputChange(e, index, 'returnType')}
                                placeholder="Return Type"
                                className="w-1/2 p-2 border rounded"
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addMethod} className="mb-4 text-blue-500">+ Add Method</button>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Add Interface</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InterfaceForm;