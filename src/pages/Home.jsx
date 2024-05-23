import { useState, useEffect, useCallback } from "react";
import { Container, Heading, VStack } from "@chakra-ui/react";
import CreateTask from "../components/CreateTask";
import TodoList from "../components/TodoList";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(async () => {
    const response = await fetch("https://jjfebbwwtcxyhvnkuyrh.supabase.co/rest/v1/tasks", {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
    });
    const data = await response.json();
    setTasks(data);
  }, []);

  const createTask = async (description) => {
    const response = await fetch("https://jjfebbwwtcxyhvnkuyrh.supabase.co/rest/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ description, completed: false }),
    });
    const newTask = await response.json();
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const updateTask = async (id, completed) => {
    await fetch(`https://jjfebbwwtcxyhvnkuyrh.supabase.co/rest/v1/tasks?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ completed }),
    });
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, completed } : task))
    );
  };

  const removeTask = async (id) => {
    await fetch(`https://jjfebbwwtcxyhvnkuyrh.supabase.co/rest/v1/tasks?id=eq.${id}`, {
      method: "DELETE",
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
    });
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch" w="100%">
        <Heading as="h1" size="xl" textAlign="center">
          Todo List
        </Heading>
        <CreateTask addTask={createTask} />
        <TodoList
          tasks={tasks}
          toggleTaskCompletion={(id, completed) => updateTask(id, completed)}
          deleteTask={removeTask}
        />
      </VStack>
    </Container>
  );
};

export default Home;