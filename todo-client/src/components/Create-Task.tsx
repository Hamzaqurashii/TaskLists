import React, { useRef } from "react";
import { IAddTask, ITask } from "../interface";
import { addTask } from "../redux/taskSlice";
import { useNavigate } from "react-router-dom";
import { AddTask } from "../requests";
import { useDispatch } from "react-redux";
import { Box, TextField, Button, Typography } from "@mui/material";

export default function CreateTask() {
  const descriptionElement = useRef<HTMLTextAreaElement>(null);
  const titleElement = useRef<HTMLInputElement>(null);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const postObj: IAddTask = {
      title: titleElement.current?.value ?? "",
      description: descriptionElement.current?.value ?? "",
      isCompleted: false,
    };

    const task: ITask = await AddTask(postObj);

    dispatch(addTask(task));

    if (titleElement.current) titleElement.current.value = "";
    if (descriptionElement.current) descriptionElement.current.value = "";

    navigation("/");
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Create Task
        </Typography>
        <Box
          sx={{
            mt: 3,
            display: "grid",
            gridTemplateColumns: { sm: "1fr", md: "2fr 4fr" },
            gap: 3,
          }}
        >
          <Box sx={{ gridColumn: "span 2" }}>
            <TextField
              label="Title"
              id="title"
              name="title"
              inputRef={titleElement}
              autoComplete="title"
              placeholder="Enter Title"
              fullWidth
              variant="outlined"
              InputProps={{
                sx: {
                  bgcolor: "background.paper",
                  boxShadow: 1,
                  "&:hover": {
                    boxShadow: 2,
                  },
                  "&.Mui-focused": {
                    boxShadow: 3,
                  },
                },
              }}
            />
          </Box>
          <Box sx={{ gridColumn: "span 2" }}>
            <TextField
              label="Description"
              id="description"
              name="description"
              inputRef={descriptionElement}
              placeholder="Enter the description"
              multiline
              rows={3}
              fullWidth
              variant="outlined"
              InputProps={{
                sx: {
                  bgcolor: "background.paper",
                  boxShadow: 1,
                  "&:hover": {
                    boxShadow: 2,
                  },
                  "&.Mui-focused": {
                    boxShadow: 3,
                  },
                },
              }}
            />
          </Box>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "#6F4E37",
              "&:hover": {
                bgcolor: "#ECB176",
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
