import { PrismaClient } from '@prisma/client';
import { procedure, router } from '../trpc';
import { z } from 'zod';

const prisma = new PrismaClient();

export const todoRouter = router({
  getTodos: procedure.query(async () => {
    return await prisma.todo.findMany();
  }),
  addTodos: procedure
    .input(
      z.object({
        todo: z.string(),
        description: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      return await prisma.todo.create({
        data: {
          todo: input.todo,
          description: input.description,
        },
      });
    }),
  deleteTodos: procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      return await prisma.todo.delete({
        where: {
          id: input.id,
        },
      });
    }),
  editTodo: procedure
    .input(
      z.object({
        id: z.string(),
        todo: z.string(),
        description: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      return await prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          todo: input.todo,
          description: input.description,
        },
      });
    }),
});
