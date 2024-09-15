import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

const SleepDataChart = ({ sleepData }) => {
  const secondsToHours = (seconds) => {
    return (seconds / 3600).toFixed(2); // Convert seconds to hours
  };

  const cumulativeTime = sleepData.reduce((acc, data, index) => {
    const previousTime = index === 0 ? 0 : acc[index - 1].time;
    acc.push({ time: previousTime + data.duration, stage: data.stage });
    return acc;
  }, []);

  const timePoints = cumulativeTime.map((data) => secondsToHours(data.time)); // Convert cumulative time from seconds to hours

  const stages = cumulativeTime.map((data) => {
    if (data.stage == 1) return 1;
    return data.stage - 2;
  });

  const data = {
    labels: timePoints,
    datasets: [
      {
        label: "Sleep Pattern Simulation",
        data: stages,
        borderColor: "rgba(255, 255, 0, 1)",
        backgroundColor: "transparent",
        pointBackgroundColor: "rgba(255, 255, 0, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255, 255, 0, 1)",
        pointStyle: "star",
        pointRadius: 8,
        pointHoverRadius: 10,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Sleep Pattern Simulation",
        color: "rgba(255, 255, 0, 1)",
        font: {
          family: "Montserrat",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Hours Since Sleep Started",
          color: "rgba(255, 255, 0, 1)",
          font: {
            family: "Montserrat",
          },
        },
        ticks: {
          color: "rgba(255, 255, 0, 1)",
          font: {
            family: "Montserrat",
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Sleep Stages",
          color: "rgba(255, 255, 0, 1)",
          font: {
            family: "Montserrat",
          },
          align: "center", // Adjust the position to prevent overlapping
          padding: { top: 30 }, // Add some padding to prevent overlap with labels
        },
        ticks: {
          stepSize: 1,
          color: "rgba(255, 255, 0, 1)",
          font: {
            family: "Montserrat",
          },
          callback: function (value) {
            const stageLabels = {
              1: "Awake",
              2: "Light Sleep",
              3: "Deep Sleep",
              4: "REM Sleep",
            };
            return stageLabels[value] || "";
          },
        },
        min: 1,
        max: 4,
      },
    },
    backgroundColor: "transparent",
  };

  return <Line data={data} options={options} />;
};

export default SleepDataChart;
