const ProdutoModel = require('../models/ProdutoModel');
const produtoController = {
     async listar(req, res) {
          try {
               const produtos = await ProdutoModel.findAll();

               res.json({ 
                    success: true, 
                    data: produtos
               });
          } catch (error) {
               console.error(error);
               
               res.status(500).json({ 
                    success: false,
                    message: 'Erro ao listar produtos' 
               });
          }
     },

     async buscarPorId(req, res) {
          try {
               const { id } = req.params;
               const produto = await ProdutoModel.findById(id);
               
               if (!produto) {
                    return res.status(404).json({ 
                         success: false, 
                         message: 'Produto não encontrado' 
                    });
               }
               
               res.json({ 
                    success: true,
                    data: produto 
               });
          } catch (error) {
               console.error(error);
               res.status(500).json({ 
                    success: false,
                    message: 'Erro ao buscar produto' 
               });
          }
     },

     async criar(req, res) {
          try {
          const { nome, descricao, preco, estoque } = req.body;

          if (!nome || !preco) {
          return res.status(400).json({
               success: false,
               message: 'Nome e preço são obrigatórios'
          });
          }
          const novoProduto = await ProdutoModel.create({ nome, descricao, preco, estoque });
          res.status(201).json({ 
               success: true, 
               data: novoProduto 
          });

          } catch (error) {
               console.error(error);
               res.status(500).json({ 
                    success: false, 
                    message: 'Erro ao criar produto' 
               });
          }
     },

     async atualizar(req, res) {
          try {
          const { id } = req.params;
          const { nome, descricao, preco, estoque } = req.body;
          const produtoAtualizado = await ProdutoModel.update(id, { nome, descricao, preco, estoque });

          if (!produtoAtualizado) {
               return res.status(404).json({ 
                    success: false, 
                    message: 'Produto não encontrado' 
               });
          }
          
          res.json({ 
               success: true, 
               data: produtoAtualizado 
          });

          } catch (error) {
               console.error(error);
               res.status(500).json({ 
                    success: false, 
                    message: 'Erro ao atualizar produto' 
               });
          }
     },

     async deletar(req, res) {
          try {
          const { id } = req.params;
          const deletado = await ProdutoModel.delete(id);

          if (!deletado) {
               return res.status(404).json({ 
                    success: false,
                    message: 'Produto não encontrado' 
               });
          }
               
               res.json({ 
                    success: true, 
                    message: 'Produto deletado com sucesso' 
               });
               
          } catch (error) {
               console.error(error);
               res.status(500).json({ 
                    success: false, 
                    message: 'Erro ao deletar produto' 
               });
          }
     }
};

module.exports = produtoController;