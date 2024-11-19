export type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch('http://localhost:8081/todo', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
      Authorization: 'Bearer test',
    },
  });
  if (!response.ok) {
    throw new Error('Error fetching todos');
  }
  return response.json();
};

export const createTodo = async (newTodo: Omit<Todo, 'id'>): Promise<Todo> => {
  const response = await fetch('http://localhost:8081/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
    body: JSON.stringify(newTodo),
  });

  if (!response.ok) {
    throw new Error('Error creating todo');
  }

  return response.json();
};

export const updateTodo = async (updatedTodo: Todo): Promise<Todo> => {
  const response = await fetch(`http://localhost:8081/todo/${updatedTodo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
    body: JSON.stringify(updatedTodo),
  });

  if (!response.ok) {
    throw new Error('Error updating todo');
  }

  return response.json();
};

export const deleteTodo = async (id: number): Promise<number> => {
  const response = await fetch(`http://localhost:8081/todo/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: '*/*',
    },
  });

  if (!response.ok) {
    throw new Error('Error deleting todo');
  }

  return id;
};
