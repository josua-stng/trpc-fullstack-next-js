import CreateTodo from './todo/create-todo/create-todo';
import Todos from './todo/get-todo/todos';

export default function Home() {
  return (
    <>
      <CreateTodo />
      <Todos />
    </>
  );
}
