import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormEventHandler } from 'react';
import { Control, UseFormReturn } from 'react-hook-form';

type FormValues = {
  todo: string;
  description: string;
};

type FormLogin = {
  form: UseFormReturn<FormValues>;
  handleAddedTodo: FormEventHandler<HTMLFormElement>;
  control: Control<FormValues>;
};

export default function FormTodo({
  form,
  handleAddedTodo,
  control,
}: FormLogin) {
  return (
    <Form {...form}>
      <form onSubmit={handleAddedTodo} className="space-y-3">
        <h1 className="font-semibold text-lg text-center">Form Todo</h1>
        <FormField
          control={control}
          name="todo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Todo</FormLabel>
              <FormControl>
                <Input
                  placeholder="todo"
                  {...field}
                  className="border border-gray-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="description"
                  {...field}
                  className="border border-gray-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Add Todo
        </Button>
      </form>
    </Form>
  );
}
