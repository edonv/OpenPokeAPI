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

const filesWithOptionalProps = {
    'FlavorText.json': ['version'],
    'Item.json': ['machines'],
    'PokemonSprites.json': ['versions'],
    'PokemonSpritesVersions.json': [
        'generation-i',
        'generation-ii',
        'generation-iii',
        'generation-iv',
        'generation-v',
        'generation-vi',
        'generation-vii'
    ]
};

for (const filePath of files) {
    const fileName = filePath.split('/').at(-1);
    const file = fs.readFileSync(filePath, {
        encoding: 'utf8'
    });

    const json = JSON.parse(file);
    if ('type' in json && json['type'] == 'object') {
        if ('properties' in json) {
            const properties = json['properties'];
            const propertyKeys = Object.keys(properties);
            // console.log(propertyKeys);

            // Exclude optional properties
            if (Object.keys(filesWithOptionalProps).includes(fileName)) {
                for (const key of filesWithOptionalProps[fileName]) {
                    const index = propertyKeys.indexOf(key);
                    propertyKeys.splice(index, 1);
                }
            }
            
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
