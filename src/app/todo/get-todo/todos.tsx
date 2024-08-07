'use client';
import { trpc } from '@/app/_trpc/client';
import DeleteTodo from '../delete-todo/button-delete-todo';
import EditTodo from '../edit-todo/button-edit-todo';

export default function Todos() {
  const getTodos = trpc.todo.getTodos.useQuery();
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 max-w-6xl mx-auto gap-7 mt-9 p-5">
      {getTodos.data?.map((todo) => {
        return (
          <main
            key={todo.id}
            className="border border-gray-400 p-4 space-y-2 rounded-md"
          >
            <p>{todo.todo}</p>
            <p>{todo.description}</p>
            <div className="flex justify-evenly">
              <EditTodo
                id={todo.id}
                todo={todo.todo}
                description={todo.description}
              />
              <DeleteTodo id={todo.id} />
            </div>
          </main>
        );
      })}
    </div>
  );
}
