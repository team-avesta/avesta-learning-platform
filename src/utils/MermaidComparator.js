import stringSimilarity from 'string-similarity';

export const compareCodes = (originalCode, comparisonCode) => {
    console.log("Original code:", originalCode);
    console.log("Comparison code:", comparisonCode);

    if (!originalCode || !comparisonCode) {
        return { identical: false, differences: [{ type: 'error', message: 'One or both codes are empty' }] };
    }

    if (originalCode.trim() === comparisonCode.trim()) {
        return { identical: true, differences: [] };
    }

    const differences = [];

    const originalClasses = extractClasses(originalCode);
    const comparisonClasses = extractClasses(comparisonCode);

    console.log("Original classes:", originalClasses);
    console.log("Comparison classes:", comparisonClasses);

    const removedClasses = originalClasses.filter(c => !comparisonClasses.some(cc => cc.name === c.name));
    const addedClasses = comparisonClasses.filter(c => !originalClasses.some(oc => oc.name === c.name));
    const commonClasses = originalClasses.filter(c => comparisonClasses.some(cc => cc.name === c.name));

    if (removedClasses && removedClasses.length > 0) {
        differences.push({
            type: 'classes_missing',
            missingClasses: removedClasses.map(c => c.name),
            message: `Classes missing in solution: ${removedClasses.map(c => c.name).join(', ')}`
        });
    }

    if (addedClasses && addedClasses.length > 0) {
        differences.push({
            type: 'classes_added',
            addedClasses: addedClasses.map(c => c.name),
            message: `Extra classes in user code: ${addedClasses.map(c => c.name).join(', ')}`
        });
    }

    commonClasses.forEach(originalClass => {
        const comparisonClass = comparisonClasses.find(cc => cc.name === originalClass.name);
        console.log(`Comparing class: ${originalClass.name}`);
        console.log(`Original class:`, originalClass);
        console.log(`Comparison class:`, comparisonClass);

        // Compare properties
        const removedProperties = originalClass.properties.filter(p =>
            !comparisonClass.properties.some(cp => cp.name === p.name)
        );
        const changedProperties = originalClass.properties.filter(op => {
            const cp = comparisonClass.properties.find(p => p.name === op.name);
            return cp && cp.type !== op.type;
        });

        // Compare methods
        const removedMethods = originalClass.methods.filter(m =>
            !comparisonClass.methods.some(cm => cm === m)
        );

        console.log(`Removed properties:`, removedProperties);
        console.log(`Changed properties:`, changedProperties);
        console.log(`Removed methods:`, removedMethods);

        // Only add property mismatch if there are actual property differences
        if (removedProperties.length > 0) {
            // Filter out properties that are actually methods
            const actualRemovedProperties = removedProperties.filter(p => !originalClass.methods.includes(p.name));
            if (actualRemovedProperties.length > 0) {
                const missingPropertiesMessage = actualRemovedProperties.map(p => `${p.name}: ${p.type}`).join(', ');
                differences.push({
                    type: 'properties_missing',
                    className: originalClass.name,
                    message: `Properties missing in class ${originalClass.name}: ${missingPropertiesMessage}`
                });
            }
        }

        if (removedMethods.length > 0) {
            const missingMethodsMessage = removedMethods.join(', ');
            differences.push({
                type: 'methods_missing',
                className: originalClass.name,
                message: `Methods missing in class ${originalClass.name}: ${missingMethodsMessage}`
            });
        }

        if (changedProperties.length > 0) {
            changedProperties.forEach(p => {
                const newProperty = comparisonClass.properties.find(cp => cp.name === p.name);
                differences.push({
                    type: 'property_changed',
                    className: originalClass.name,
                    propertyName: p.name,
                    oldType: p.type,
                    newType: newProperty.type,
                    message: `Property ${p.name} in class ${originalClass.name} changed from ${p.type} to ${newProperty.type}`
                });
            });
        }
    });

    // Compare relationships
    const originalRelationships = extractRelationships(originalCode);
    const comparisonRelationships = extractRelationships(comparisonCode);

    console.log("Original relationships:", originalRelationships);
    console.log("Comparison relationships:", comparisonRelationships);

    const removedRelationships = originalRelationships.filter(r => !comparisonRelationships.some(cr =>
        cr.from === r.from && cr.to === r.to && cr.type === r.type
    ));

    const addedRelationships = comparisonRelationships.filter(r => !originalRelationships.some(or =>
        or.from === r.from && or.to === r.to && or.type === r.type
    ));

    console.log("Removed relationships:", removedRelationships);
    console.log("Added relationships:", addedRelationships);

    if (removedRelationships && removedRelationships.length > 0) {
        differences.push({
            type: 'relationships_missing',
            missingRelationships: removedRelationships,
            message: `Relationships missing in user code: ${removedRelationships.map(r => `${r.from} ${r.type} ${r.to}`).join(', ')}`
        });
    }

    if (addedRelationships && addedRelationships.length > 0) {
        differences.push({
            type: 'relationships_added',
            addedRelationships: addedRelationships,
            message: `Extra relationships in user code: ${addedRelationships.map(r => `${r.from} ${r.type} ${r.to}`).join(', ')}`
        });
    }

    console.log("Final differences:", differences);

    return { identical: differences.length === 0, differences };
};

const extractClasses = (code) => {
    const classRegex = /class\s+(\w+)(?:\s*{([^}]*)})?/g;
    const classes = [];
    let match;
    while ((match = classRegex.exec(code)) !== null) {
        const className = match[1];
        const classContent = match[2] || '';

        const methodRegex = /(\w+)\s*\([^)]*\)/g;
        const propertyRegex = /(\+|-|#)?\s*(\w+)\s*(?::\s*(\w+))?/g;

        const methods = [];
        const properties = [];

        let methodMatch;
        while ((methodMatch = methodRegex.exec(classContent)) !== null) {
            methods.push(methodMatch[1]);
        }

        let propertyMatch;
        while ((propertyMatch = propertyRegex.exec(classContent)) !== null) {
            // Check if it's not a method (doesn't end with parentheses)
            if (!propertyMatch[0].includes('(')) {
                properties.push({
                    name: propertyMatch[2],
                    type: propertyMatch[3] || 'any' // Use 'any' if type is not specified
                });
            }
        }

        classes.push({
            name: className,
            methods,
            properties
        });
    }
    console.log("Extracted classes:", classes);
    return classes;
};

const extractRelationships = (code) => {
    const relationshipRegex = /(\w+)\s+(<\|--|--|>|\.\.|<\.\.|\.\.|>|--|o|o--|<--|\*--|\*\.\.)\s+(\w+)(?:\s*:\s*(.*))?/g;
    const relationships = [];
    let match;
    while ((match = relationshipRegex.exec(code)) !== null) {
        relationships.push({
            from: match[1],
            type: match[2],
            to: match[3],
            label: match[4] || ''
        });
    }
    console.log("Extracted relationships:", relationships);
    return relationships;
};