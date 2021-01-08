const path = require('path');

module.exports = {
    entry: './Src/Bin/www.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'Build'),
        filename: 'api.bundle.js',
    },
    target: 'node',
};