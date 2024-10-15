import React, { useState, useEffect } from 'react';

const RelationshipForm = ({ onSubmit, onClose }) => {
    const [fromClass, setFromClass] = useState('');
    const [toClass, setToClass] = useState('');
    const [relationType, setRelationType] = useState('-->');
    const [label, setLabel] = useState('');

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
        let relationshipCode;
        if (relationType === '..|>') {
            // For interface implementation, we reverse the order
            relationshipCode = `${toClass} <|.. ${fromClass} : implements`;
        } else {
            relationshipCode = `${fromClass} ${relationType} ${toClass}${label ? ` : ${label}` : ''}`;
        }
        onSubmit(relationshipCode);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center" onClick={onClose}>
            <div className="bg-white p-5 rounded-lg w-96" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4">Add New Relationship</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={fromClass}
                        onChange={(e) => setFromClass(e.target.value)}
                        placeholder={relationType === '..|>' ? "Class Name" : "From Class"}
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <input
                        type="text"
                        value={toClass}
                        onChange={(e) => setToClass(e.target.value)}
                        placeholder={relationType === '..|>' ? "Interface Name" : "To Class"}
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <select
                        value={relationType}
                        onChange={(e) => setRelationType(e.target.value)}
                        className="w-full p-2 mb-4 border rounded"
                    >
                        <option value="-->">Association</option>
                        <option value="--|>">Inheritance</option>
                        <option value="--*">Composition</option>
                        <option value="--o">Aggregation</option>
                        <option value="..>">Dependency</option>
                        <option value="--">Link</option>
                        <option value="..|>">Interface Implementation</option>
                    </select>
                    {relationType !== '..|>' && (
                        <input
                            type="text"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            placeholder="Relationship Label (optional)"
                            className="w-full p-2 mb-4 border rounded"
                        />
                    )}
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Add Relationship</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RelationshipForm;