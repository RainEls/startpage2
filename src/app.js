import { Box, CssBaseline, Stack } from "@mui/material";

import config from "./const/config.json";

import theme from "./theme.js";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import HeaderKiosk from "./components/header/index.js";

import { CurrentDate, CurrentTime } from "./components/datetime/index.js";
import CurrentWeather from "./components/weather";
import ViewTasksActive from "./components/todoist";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          position: "fixed",
          top: "0",
          width: "100%",
          zIndex: 100,
          backgroundColor: "black",
          opacity: "75%",
        }}
      >
        <Box height="15%">
          <HeaderKiosk />
        </Box>
      </div>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={2}
        style={{
          backgroundColor: "black",
          backgroundImage: `url("${config.bg}")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
          height: "100vh",
          margin: 0,
        }}
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-end"
          spacing={2}
          position="absolute"
          left="3%"
          bottom="5%"
        >
          <CurrentDate />
        </Stack>

        <Stack
          direction="column"
          justifyContent="flex-end"
          alignItems="flex-end"
          spacing={2}
          position="absolute"
          right="3%"
          bottom="5%"
        >
          <CurrentTime />
          <CurrentWeather />
        </Stack>

        <Stack
          direction="column"
          justifyContent="flex-end"
          alignItems="flex-end"
          spacing={2}
          position="absolute"
          right="2%"
          top="17%"
        >
          <ViewTasksActive />
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
