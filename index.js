import express from 'express'
import cors from 'cors';
import { PrismaClient } from '@prisma/client';


const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors())

app.listen(PORT,() => {
    console.log(`Servidor rodando na porta ${PORT}`);
})

app.post('/tarefa', async(req, res) => {
    try {
        const tarefa = await prisma.tarefa.create({
            data : {
                titulo : req.body.titulo,
                descricao : req.body.descricao,
                status : req.body.status
            }
        });
        res.status(201).json({mensagem : 'tarefa criada com sucesso', tarefa})
    } catch (error) {
        
    }
})

app.get('/tarefa', async(req, res) =>{
    try {
        const tarefa = await prisma.tarefa.findMany();
            res.json(tarefa)
    } catch (error) {
        res.status(500).json({error : "Erro ao listar tarefas"})
    }
})

app.put('/tarefa/:id', async(req, res) => {
    const {titulo , descricao, status} = req.body;
    try {
        const tarefa = await prisma.tarefa.update({
            where : {id : req.params.id},
            data : {titulo, descricao, status}
        });
        res.status(201).json({mensagem : "tarefa criada com sucesso", tarefa})
    } catch (error) {
        res.status(500).json({error : "Erro ao atualizar tarefa"})
    }
})

app.delete('/tarefa/:id', async(req, res) => {
    try {
        const tarefa = await prisma.tarefa.delete({
            where : {id : req.params.id}
        });
        res.status(201).json({message : 'excluido com sucesso', tarefa});
    } catch (error) {
        res.status(500).json({error : "erro ao excluir tarefa"})
    }
})