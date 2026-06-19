const fs = require('fs').promises;
const path = require('path');
const DATA_PATH = path.join(__dirname, '../../data/produtos.json\'');

async function lerProdutos() {
     try {
          const data = await fs.readFile(DATA_PATH, 'utf8');
          return JSON.parse(data);
     } catch (error) {
          return [];
     }
}

async function escreverProdutos(produtos) {
     const data = JSON.stringify(produtos, null, 2);
     await fs.writeFile(DATA_PATH, data, 'utf8');
}

module.exports = { lerProdutos, escreverProdutos };