const { lerProdutos, escreverProdutos } = require('../utils/jsonHelper');
class ProdutoModel {
     static async findAll() {
          return await lerProdutos();
     }

     static async findById(id) {
          const produtos = await lerProdutos();
          return produtos.find(p => p.id === parseInt(id));
     }

     static async create(produtoData) {
          const produtos = await lerProdutos();
          const novoId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;

          const novoProduto = {
               id: novoId,
               ...produtoData
          };

          produtos.push(novoProduto);
          await escreverProdutos(produtos);
          return novoProduto;
     }

     static async update(id, produtoData) {
          const produtos = await lerProdutos();
          const index = produtos.findIndex(p => p.id === parseInt(id));
          if (index === -1) {
               return null
          }; 
          
          const produtoAtualizado = {
               ...produtos[index],
               ...produtoData,
               id: produtos[index].id
          };

          produtos[index] = produtoAtualizado;
          await escreverProdutos(produtos);
          return produtoAtualizado;
     }

     static async delete(id) {
          const produtos = await lerProdutos();
          const index = produtos.findIndex(p => p.id === parseInt(id));
          
          if (index === -1) {
               return false
          };
          
          produtos.splice(index, 1);
          await escreverProdutos(produtos);
          return true;
     }
}
module.exports = ProdutoModel;