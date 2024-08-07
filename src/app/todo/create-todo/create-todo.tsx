'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FormTodo from './todo-form';
import { trpc } from '@/app/_trpc/client';

const formSchema = z.object({
  todo: z.string().min(5, 'minimun todo 5 character'),
  description: z.string().min(5, 'minimun description 5 character'),
});

type FormSchema = z.infer<typeof formSchema>;

export default function CreateTodo() {
  const getTodos = trpc.todo.getTodos.useQuery();
  const addTodo = trpc.todo.addTodos.useMutation({
    onSuccess: () => {
      getTodos.refetch();
    },
  });
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todo: '',
      description: '',
    },
  });

  const { control, handleSubmit, reset } = form;
  const handleAddedTodo = handleSubmit((values) => {
    const { todo, description } = values;
    addTodo.mutate({
      todo,
      description,
    });
    reset();
  });

  return (
    <div className="border border-gray-600 max-w-xs mx-auto p-5 rounded-md mt-10">
      <FormTodo
        form={form}
        control={control}
        handleAddedTodo={handleAddedTodo}
      />
    </div>
  );
}
