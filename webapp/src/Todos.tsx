import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../lib/api';

const Todos: React.FC = () => {
  const [newTodo, setNewTodo] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const queryClient = useQueryClient();

  // Fetching todos
  const { data: todos, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  // Creating todo
  const { mutate: addTodo } = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
  });

  // Updating todo
  const { mutate: editTodo } = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
  });

  // Deleting todo
  const { mutate: removeTodo } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
  });

  const handleAddTodo = () => {
    if (newTodo.trim() && newDescription.trim()) {
      addTodo({
        title: newTodo,
        description: newDescription,
        completed: false,
      });
      setNewTodo('');
      setNewDescription('');
    }
  };

  const handleToggleComplete = (id: number, completed: boolean) => {
    const todoToUpdate = todos?.find((todo) => todo.id === id);
    if (todoToUpdate) {
      editTodo({ ...todoToUpdate, completed: !completed });
    }
  };

  const handleDeleteTodo = (id: number) => {
    removeTodo(id);
  };

  if (isLoading) return <div className="text-center text-xl">Loading...</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6 text-indigo-600">
        Todos
      </h1>

      <div className="mb-4 flex flex-col space-y-3">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Title"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Description"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleAddTodo}
          className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Add Todo
        </button>
      </div>

      <ul className="space-y-3">
        {todos?.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-md"
          >
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
              className="text-lg cursor-pointer"
              onClick={() => handleToggleComplete(todo.id, todo.completed)}
            >
              {todo.title} - {todo.description}
            </span>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="text-red-600 hover:text-red-800 transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
