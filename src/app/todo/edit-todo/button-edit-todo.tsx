import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { DialogEditTodo } from './dialog-edit-todo';

type EditTodoProps = {
  id: string;
  todo: string;
  description: string;
};

export default function EditTodo({ id, todo, description }: EditTodoProps) {
  const [open, setOpenChange] = useState(false);
  const handleIsEdit = () => {
    setOpenChange((prevValue) => !prevValue);
  };
  return (
    <div>
      <Button
        className="px-6 bg-sky-500 hover:bg-sky-600"
        onClick={handleIsEdit}
      >
        Edit
      </Button>
      {open && (
        <>
          <DialogEditTodo
            open={open}
            onOpenChange={setOpenChange}
            id={id}
            todo={todo}
            description={description}
          />
        </>
      )}
    </div>
  );
}
