import { useState } from "react";
import { HStack, Input, Button } from "@chakra-ui/react";

const CreateTask = ({ addTask }) => {
  const [taskDescription, setTaskDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskDescription.trim() !== "") {
      addTask(taskDescription);
      setTaskDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack spacing={4}>
        <Input
          placeholder="Enter task description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <Button type="submit">Add Task</Button>
      </HStack>
    </form>
  );
};

export default CreateTask;