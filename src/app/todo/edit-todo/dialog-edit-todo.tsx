import { trpc } from '@/app/_trpc/client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type DialogEditTodoProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
  todo: string;
  description: string;
};

const dialogSchema = z.object({
  todo: z.string().min(5, 'minimun todo 5 character'),
  description: z.string().min(5, 'minimun description 5 character'),
});

type DialogSchema = z.infer<typeof dialogSchema>;

export function DialogEditTodo({
  open,
  onOpenChange,
  id,
  todo,
  description,
}: DialogEditTodoProps) {
  const getTodos = trpc.todo.getTodos.useQuery();
  const editTodo = trpc.todo.editTodo.useMutation({
    onSuccess: () => {
      getTodos.refetch();
    },
  });

  const form = useForm<DialogSchema>({
    resolver: zodResolver(dialogSchema),
    defaultValues: {
      todo: todo,
      description: description,
    },
  });

  const { control, handleSubmit } = form;

  const handleEditTodo = handleSubmit((values) => {
    const { todo, description } = values;
    editTodo.mutate({ id, todo, description });
    onOpenChange(false);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit todo</DialogTitle>
          <DialogDescription>
            Make changes to your todo here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleEditTodo} className="space-y-4">
            <FormField
              control={control}
              name="todo"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center text-right gap-4">
                    <FormLabel>Todo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="todo"
                        {...field}
                        className="border border-gray-500 col-span-3"
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-right text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="description"
                        {...field}
                        className="border border-gray-500 col-span-3"
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-right  text-sm " />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
