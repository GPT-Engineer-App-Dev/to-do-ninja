import { useState } from "react";
import { Container, Heading, VStack } from "@chakra-ui/react";
import CreateTask from "../components/CreateTask";
import TodoList from "../components/TodoList";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (description) => {
    setTasks([...tasks, { description, completed: false }]);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch" w="100%">
        <Heading as="h1" size="xl" textAlign="center">
          Todo List
        </Heading>
        <CreateTask addTask={addTask} />
        <TodoList
          tasks={tasks}
          toggleTaskCompletion={toggleTaskCompletion}
          deleteTask={deleteTask}
        />
      </VStack>
    </Container>
  );
};

export default Home;