import create from "zustand";
import axios from "axios";
import React from "react";

import config from "../../const/config.json";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineDot from "@mui/lab/TimelineDot";

import { TextField, Typography } from "@mui/material";
import { nth } from "../../utils/utils";

// Get your API token from https://todoist.com/app/settings/integrations/developer and put it in config

const useStore = create((set) => ({
  isTasksActiveChecked: false,
  tasksActive: [],
  getTasksActive: async () => {
    if (config.tokenTodoist)
      await axios
        .get(`https://api.todoist.com/rest/v2/tasks`, {
          headers: {
            Authorization: `Bearer ${config.tokenTodoist}`,
          },
        })
        .then((response) => {
          // console.log(response.data);

          set({
            tasksActive: response.data,
            isTasksActiveChecked: true,
            isTaskCreateSuccess: false,
          });
        })
        .catch((error) => console.error(error));
  },
  isTaskCreateSuccess: false,
  createTask: async (content) => {
    if (config.tokenTodoist) await axios
      .post(
        `https://api.todoist.com/rest/v2/tasks`,
        {
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${config.tokenTodoist}`,
          },
        }
      )
      .then((response) => {
        // console.log(response.data);

        set({
          isTaskCreateSuccess: true,
          isTasksActiveChecked: false,
        });
      })
      .catch((error) => console.error(error));
  },
}));

function InputNewTask() {
  let inputRef = React.useRef();
  let createTask = useStore((state) => state.createTask);

  let add = () => {
    console.log(inputRef.current.value);
    createTask(inputRef.current.value);
    inputRef.current.value = "";
  };

  return (
    <div>
      <TextField
        variant="standard"
        size="small"
        inputRef={inputRef}
        onSubmit={add}
        onKeyPress={(e) => {
          if (e.key === "Enter") add();
        }}
        sx={{
          mr: 1,
          input: {
            color: "white",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "white",
          },
        }}
      />
    </div>
  );
}

function ViewTasksActive() {
  let tasksActive = useStore((state) => state.tasksActive);
  let isTasksActiveChecked = useStore((state) => state.isTasksActiveChecked);
  let isTaskCreateSuccess = useStore((state) => state.isTaskCreateSuccess);
  let getTasksActive = useStore((state) => state.getTasksActive);

  React.useEffect(() => {
    getTasksActive();
  }, [getTasksActive]);

  if (isTaskCreateSuccess) getTasksActive();

  if (!tasksActive.length)
    if (isTasksActiveChecked)
      return (
        <div>
          <InputNewTask />
          <Typography variant="h4" color="white">
            All clear!
          </Typography>
        </div>
      );
    else return <div />;

  return (
    <div>
      <InputNewTask />

      <Timeline position="left" sx={{ width: "100%" }}>
        {tasksActive.slice(0, 4).map((event) => {
          let dueDate = "";

          if (event.due !== null) {
            let due = new Date(event.due.date);
            dueDate = `${due.toLocaleDateString("en", {
              month: "long",
            })}, ${due.getDate()}${nth(due.getDate())}`;
          }

          return (
            <TimelineItem key={event.content}>
              <TimelineOppositeContent display="none" />
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="h7" color="white">
                  {event.content}
                </Typography>
                <Typography color="white">{dueDate}</Typography>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </div>
  );
}

export default ViewTasksActive;
