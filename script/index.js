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
            
            const newFileContents = {
                type: 'object',
                required: propertyKeys,
                properties: properties
            };

            fs.writeFileSync(filePath, JSON.stringify(newFileContents, null, 2) + '\n', {
                encoding: 'utf8'
            });
            console.log(`Finished processing ${filePath}...`);
        }
    }
}
