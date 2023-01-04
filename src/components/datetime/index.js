import React from "react";

import { Box, Typography } from "@mui/material";
import { nth } from "../../utils/utils";

export function CurrentDate() {
  let today = new Date();

  let day = today.toLocaleDateString("en", { weekday: "long" });
  let date = `${today.toLocaleDateString("en", {
    month: "long",
  })}, ${today.getDate()}${nth()}`;

  return (
    <Box height="15%">
      <Typography variant="h4" color="white">
        {day}
      </Typography>
      <Typography variant="h2" color="white">
        {date}
      </Typography>
    </Box>
  );
}

export function CurrentTime() {
  let [currentTime, setTime] = React.useState("");

  let time = currentTime.toLocaleString("en", {
    hour: "2-digit",
    minute: "numeric",
    hour12: true,
  });

  React.useEffect(() => {
    setInterval(() => {
      let nwDate = new Date();
      setTime(nwDate);
    }, 1000);
  }, []);

  return (
    <Typography variant="h2" color="white">
      {time}
    </Typography>
  );
}
