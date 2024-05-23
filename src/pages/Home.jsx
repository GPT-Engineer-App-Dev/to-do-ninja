import { useState, useEffect, useCallback } from "react";
import { Container, Heading, VStack } from "@chakra-ui/react";
import CreateTask from "../components/CreateTask";
import TodoList from "../components/TodoList";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(async () => {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/tasks`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });
    const data = await response.json();
    setTasks(data);
  }, []);

  const createTask = async (description) => {
    await fetch(`${SUPABASE_URL}/rest/v1/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ description, completed: false }),
    });
    fetchTasks(); // Refresh the list of tasks
  };

  const updateTask = async (id, completed) => {
    await fetch(`${SUPABASE_URL}/rest/v1/tasks?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ completed }),
    });
    fetchTasks(); // Refresh the list of tasks
  };

  const removeTask = async (id) => {
    await fetch(`${SUPABASE_URL}/rest/v1/tasks?id=eq.${id}`, {
      method: "DELETE",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });
    fetchTasks(); // Refresh the list of tasks
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