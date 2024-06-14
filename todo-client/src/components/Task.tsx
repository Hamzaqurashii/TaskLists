import React, { useState } from "react";
import { ITask } from "../interface";
import TrashIcon from "@mui/icons-material/Delete";
import { deleteTaskAsync, updateTaskAsync } from "../redux/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Box, List, Button, Typography, IconButton } from "@mui/material";

interface TaskProps {
  task: ITask;
  index: number;
}

const Task: React.FC<TaskProps> = ({ task, index }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedId, setSelectedId] = useState("");
  const updateLoading = useSelector(
    (state: RootState) => state.tasks.updateLoading
  );
  const deleteLoading = useSelector(
    (state: RootState) => state.tasks.deleteLoading
  );

  const removeTask = async (id: string) => {
    dispatch(deleteTaskAsync(id));
  };

  const UpdateTask = async (id: string) => {
    dispatch(updateTaskAsync(id));
  };

  return (
    <List
      key={task.description}
      component={"li"}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        rowGap: 6,
        paddingY: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          columnGap: "1rem",
          minWidth: 0,
          flex: "auto",
        }}
      >
        <Typography>{index + 1}</Typography>
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "#6F4E37" }}
          >
            {task.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: "#A67B5B",
            }}
          >
            {task.description}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          mt: { xs: 5, md: 0 },
          alignItems: { xs: "start", sm: "center" },
        }}
      >
        {task.isCompleted ? (
          <Button
            variant="contained"
            sx={{
              bgcolor: "#6F4E37",
              height: 32,
              fontSize: { xs: 12, md: 12 },
              color: "white",
              px: 2,
              py: 1,
              borderRadius: "4px",
              "&:hover": { backgroundColor: "#A67B5B" },
            }}
          >
            Completed
          </Button>
        ) : updateLoading && task._id === selectedId ? (
          <Typography>Loading</Typography>
        ) : (
          <Button
            onClick={() => {
              setSelectedId(task._id);
              UpdateTask(task._id);
            }}
            variant="contained"
            sx={{
              bgcolor: "#6F4E37",
              "&:hover": { backgroundColor: "#A67B5B" },
              height: 32,
              fontSize: { xs: 12, md: 12 },
              color: "white",
              px: 2,
              py: 1,
              borderRadius: "4px",
            }}
          >
            Mark as completed
          </Button>
        )}

        {deleteLoading && task._id === selectedId ? (
          <Typography>loading</Typography>
        ) : (
          <IconButton
            onClick={() => {
              setSelectedId(task._id);
              removeTask(task._id);
            }}
          >
            <TrashIcon color="error" className="h-2 w-2" aria-hidden="true" />
          </IconButton>
        )}
      </Box>
    </List>
  );
};

export default Task;
