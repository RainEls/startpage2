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
          set({
            tasksActive: response.data,
            isTasksActiveChecked: true,
          });
        })
        .catch((error) => console.error(error));
  },
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
        set({
          isTasksActiveChecked: false,
        });
      })
      .catch((error) => console.error(error));
  },
  completeTask: async (taskId) => {
    console.log("Todoist completeTask API invalid?")
    // // https://developer.todoist.com/rest/v2/#close-a-task

    // if (config.tokenTodoist) await axios
    //   .post(
    //     `https://api.todoist.com/rest/v2/tasks/${taskId}/close`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${config.tokenTodoist}`,
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     set({
    //       isTasksActiveChecked: false,
    //     });
    //   })
    //   .catch((error) => console.error(error));
  },
}));

function InputNewTask() {
  let inputRef = React.useRef();
  let createTask = useStore((state) => state.createTask);

  let add = () => {
    createTask(inputRef.current.value);
    inputRef.current.value = "";
  };

  return (
    <div>
      <TextField
        variant="standard"
        size="small"
        inputRef={inputRef}
        onSubmit={() => { add() }}
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
  let getTasksActive = useStore((state) => state.getTasksActive);
  let completeTask = useStore((state) => state.completeTask);

  let handleComplete = (taskId) => {
    completeTask(taskId)
  };

  React.useEffect(() => {
    async function fetch() {
      function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
      }

      await timeout(0);
      getTasksActive();
    }

    fetch();
  }, [getTasksActive]);

  if (!isTasksActiveChecked) getTasksActive();

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
            <div key={event.id} onClick={() => { handleComplete(event.id) }}>
              <TimelineItem >
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
            </div>
          );
        })}
      </Timeline>
    </div>
  );
}

export default ViewTasksActive;
