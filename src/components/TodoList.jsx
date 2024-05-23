import { VStack, HStack, Checkbox, IconButton, Text } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

const TodoList = ({ tasks, toggleTaskCompletion, deleteTask }) => {
  return (
    <VStack spacing={4} align="stretch">
      {tasks.map((task, index) => (
        <HStack key={index} spacing={4} align="center">
          <Checkbox
            isChecked={task.completed}
            onChange={() => toggleTaskCompletion(index)}
          />
          <Text as={task.completed ? "s" : ""}>{task.description}</Text>
          <IconButton
            aria-label="Delete task"
            icon={<FaTrash />}
            onClick={() => deleteTask(index)}
          />
        </HStack>
      ))}
    </VStack>
  );
};

export default TodoList;