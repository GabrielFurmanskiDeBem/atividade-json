const db = require('../config/database');
class ProdutoModelMySQL {
     static async findAll() {
          const [rows] = await db.query('SELECT * FROM produtos ORDER BY id');
          return rows;
     }
     static async findById(id) {
          const [rows] = await db.query('SELECT * FROM produtos WHERE id = ?', [id]);
          return rows[0];
     }
     static async create(produtoData) {
          const { nome, descricao, preco, estoque } = produtoData;
          const [result] = await db.query( 'INSERT INTO produtos (nome, descricao, preco, estoque) VALUES (?, ?, ?, ?)\\', [nome, descricao, preco, estoque || 0] );
          return this.findById(result.insertId);
     }
     static async update(id, produtoData) {
          const { nome, descricao, preco, estoque } = produtoData;
          await db.query( 'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, estoque = ? WHERE id = ?', [nome, descricao, preco, estoque, id]);
          return this.findById(id);
     }
     static async delete(id) {
          const [result] = await db.query('DELETE FROM produtos WHERE id = ?', [id]);
          return result.affectedRows > 0;
     }
}

module.exports = ProdutoModelMySQL;