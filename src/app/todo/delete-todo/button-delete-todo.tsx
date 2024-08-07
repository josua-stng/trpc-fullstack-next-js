import { trpc } from '@/app/_trpc/client';
import { Button } from '@/components/ui/button';

export default function DeleteTodo({ id }: { id: string }) {
  const getTodos = trpc.todo.getTodos.useQuery();
  const deleteTodo = trpc.todo.deleteTodos.useMutation({
    onSuccess: () => {
      getTodos.refetch();
    },
  });
  const handleDeleteTodo = (id: string) => {
    deleteTodo.mutate({ id });
  };
  return (
    <Button variant="destructive" onClick={() => handleDeleteTodo(id)}>
      Delete
    </Button>
  );
}
