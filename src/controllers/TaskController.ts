import { Request, Response } from 'express';
import { Task } from '../models/Task';

export class TaskController {
  // GET /api/tasks - Lista todas as tarefas
  public static async index(req: Request, res: Response): Promise<Response> {
    try {
      const tasks = await Task.findAll();
      return res.status(200).json(tasks);
    } catch (error: any) {
      return res
        .status(500)
        .json({ erro: 'Erro ao listar tarefas', detalhe: error.message });
    }
  }

  // GET /api/tasks/:id - Busca uma tarefa por ID
  public static async show(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id) || id <= 0) {
        return res
          .status(400)
          .json({ erro: 'O ID informado deve ser um numero valido.' });
      }

      const task = await Task.findByPk(id);

      if (!task) {
        return res.status(404).json({ erro: 'Tarefa não encontrada.' });
      }

      return res.status(200).json(task);
    } catch (error: any) {
      return res
        .status(500)
        .json({ erro: 'Erro ao buscar tarefa', detalhe: error.message });
    }
  }

  // POST /api/tasks - Cadastra uma nova tarefa
  public static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { nome, descricao, estimativa_tempo, deadline } = req.body;

      if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        return res.status(400).json({ erro: 'O campo nome é obrigatório.' });
      }

      if (
        estimativa_tempo === undefined ||
        typeof estimativa_tempo !== 'number' ||
        estimativa_tempo <= 0
      ) {
        return res.status(400).json({
          erro: 'O campo estimativa_tempo é obrigatório e deve ser um numero maior que zero.',
        });
      }

      if (!deadline || isNaN(Date.parse(deadline))) {
        return res.status(400).json({
          erro: 'O campo deadline é obrigatório e deve ser uma data valida.',
        });
      }

      const novaTask = await Task.create({
        nome: nome.trim(),
        descricao: descricao ? String(descricao).trim() : null,
        estimativa_tempo,
        deadline,
      });

      return res.status(201).json(novaTask);
    } catch (error: any) {
      return res
        .status(500)
        .json({ erro: 'Erro ao cadastrar tarefa', detalhe: error.message });
    }
  }

  // PUT /api/tasks/:id - Atualiza uma tarefa existente
  public static async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id) || id <= 0) {
        return res
          .status(400)
          .json({ erro: 'O ID informado deve ser um numero valido.' });
      }

      const { nome, descricao, estimativa_tempo, deadline } = req.body;

      const task = await Task.findByPk(id);

      if (!task) {
        return res.status(404).json({ erro: 'Tarefa não encontrada.' });
      }

      if (nome !== undefined) {
        if (typeof nome !== 'string' || nome.trim() === '') {
          return res
            .status(400)
            .json({ erro: 'O campo nome deve ser um texto valido.' });
        }
        task.nome = nome.trim();
      }

      if (descricao !== undefined) {
        task.descricao = descricao ? String(descricao).trim() : null;
      }

      if (estimativa_tempo !== undefined) {
        if (typeof estimativa_tempo !== 'number' || estimativa_tempo <= 0) {
          return res.status(400).json({
            erro: 'O campo estimativa_tempo deve ser um numero maior que zero.',
          });
        }
        task.estimativa_tempo = estimativa_tempo;
      }

      if (deadline !== undefined) {
        if (isNaN(Date.parse(deadline))) {
          return res
            .status(400)
            .json({ erro: 'O campo deadline deve ser uma data valida.' });
        }
        task.deadline = deadline;
      }

      await task.save();

      return res.status(200).json(task);
    } catch (error: any) {
      return res
        .status(500)
        .json({ erro: 'Erro ao atualizar tarefa', detalhe: error.message });
    }
  }

  // DELETE /api/tasks/:id - Remove uma tarefa
  public static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id) || id <= 0) {
        return res
          .status(400)
          .json({ erro: 'O ID informado deve ser um numero valido.' });
      }

      const task = await Task.findByPk(id);

      if (!task) {
        return res.status(404).json({ erro: 'Tarefa não encontrada.' });
      }

      await task.destroy();

      // 204 No Content
      return res.status(204).send();
    } catch (error: any) {
      return res
        .status(500)
        .json({ erro: 'Erro ao excluir tarefa', detalhe: error.message });
    }
  }
}
