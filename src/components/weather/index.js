import create from "zustand";
import axios from "axios";
import React from "react";

import config from "../../const/config.json";

import { Typography } from "@mui/material";

const useStore = create((set) => ({
  isCurrentWeatherChecked: false,
  currentWeather: 0,
  currentTemperature: 0,
  getWeatherForecast: async () => {
    await axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${config.latitude}&longitude=${config.longitude}&timezone=auto&current_weather=true`
      )
      .then((response) => {
        set({
          currentWeather: response.data.current_weather.weathercode,
          currentTemperature: response.data.current_weather.temperature,
          isCurrentWeatherChecked: true,
        });
      })
      .catch((error) => console.error(error));
  },
}));

function CurrentWeather() {
  let wwo_table = [
    { wwo: 0, text: "Clear Sky" },
    { wwo: 1, text: "Mainly Clear" },
    { wwo: 2, text: "Partly Cloudy" },
    { wwo: 3, text: "Overcast" },
    { wwo: 45, text: "Fog" },
    { wwo: 48, text: "Depositing Rime Fog" },
    { wwo: 51, text: "Light Drizzle" },
    { wwo: 53, text: "Moderate Drizzle" },
    { wwo: 55, text: "Dense Drizzle" },
    { wwo: 56, text: "Light Freezing Drizzle" },
    { wwo: 57, text: "Dense Freezing Drizzle" },
    { wwo: 61, text: "Slight Rain" },
    { wwo: 63, text: "Moderate Rain" },
    { wwo: 65, text: "Heavy Rain" },
    { wwo: 66, text: "Light Freezing Rain" },
    { wwo: 67, text: "Heavy Freezing Rain" },
    { wwo: 71, text: "Slight Snow Fall" },
    { wwo: 73, text: "Moderate Snow Fall" },
    { wwo: 75, text: "Heavy Snow Fall" },
    { wwo: 77, text: "Snow Grains" },
    { wwo: 80, text: "Slight Rain Showers" },
    { wwo: 81, text: "Moderate Rain Showers" },
    { wwo: 82, text: "Heavy Rain Showers" },
    { wwo: 85, text: "Slight Snow Showers" },
    { wwo: 86, text: "Heavy Snow Showers" },
    { wwo: 95, text: "Thunderstorm" },
    { wwo: 96, text: "Thunderstorm with hail" },
    { wwo: 99, text: "Heavy Thunderstorm with hail" },
  ];

  const currentWeather = useStore((state) => state.currentWeather);
  const currentTemperature = useStore((state) => state.currentTemperature);
  const isCurrentWeatherChecked = useStore(
    (state) => state.isCurrentWeatherChecked
  );

  const getWeatherForecast = useStore((state) => state.getWeatherForecast);

  React.useEffect(() => {
    getWeatherForecast();
  }, [getWeatherForecast]);

  let weather = wwo_table.find((element) => {
    return element.wwo === currentWeather;
  }).text;

  if (!isCurrentWeatherChecked) return <div />;

  return (
    <Typography
      variant="h4"
      color="white"
      sx={{
        textAlign: "end",
      }}
    >
      {currentTemperature}°C {weather}
    </Typography>
  );
}

export default CurrentWeather;
