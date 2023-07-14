const path = require('path');
const fs = require('fs');
const solc = require('solc');

const loteriaPath = path.resolve(__dirname, 'contracts', 'Loteria.sol');
const source = fs.readFileSync(loteriaPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Loteria'];