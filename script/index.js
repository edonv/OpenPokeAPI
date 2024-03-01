// Use the following RegEx to search the project for nested objects missing `required firled`
// "type": ([\["\]\w\-,\s]+)?"object"([\["\]\w\-,\s]+)?,\n\s+"(?!required":)
const fs = require('fs');

const componentsDir = '../openapi/components';

const files = fs.readdirSync(componentsDir, {
    recursive: true
})
    .filter(filePath => filePath.includes('.json'))
    .map(relPath => `${componentsDir}/${relPath}`);

// console.log(files);

for (filePath of files) {
    const file = fs.readFileSync(filePath, {
        encoding: 'utf8'
    });

    const json = JSON.parse(file);
    if ('type' in json && json['type'] == 'object') {
        if ('properties' in json) {
            const properties = json['properties'];
            const propertyKeys = Object.keys(properties);
            // console.log(propertyKeys);
            
            const remainingData = json;
            delete remainingData.type;
            delete remainingData.required;
            delete remainingData.properties;

            const newFileContents = {
                type: 'object',
                required: propertyKeys,
                properties: properties,
                ...remainingData
            };

            fs.writeFileSync(filePath, JSON.stringify(newFileContents, null, 2) + '\n', {
                encoding: 'utf8'
            });
            console.log(`Finished processing ${filePath}...`);
        }
    }
}
