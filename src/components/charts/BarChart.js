import React from "react";
import { Bar } from "react-chartjs-2";

const options = {
  indexAxis: "x",
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};

const BarChart = ({ carModel }) => {
  const data = {
    labels: [
      carModel[0].carBrandName + " " + carModel[0].carModelName,
      carModel[1].carBrandName + " " + carModel[1].carModelName,
      carModel[2].carBrandName + " " + carModel[2].carModelName,
      carModel[3].carBrandName + " " + carModel[3].carModelName,
      carModel[4].carBrandName + " " + carModel[4].carModelName,
      carModel[5].carBrandName + " " + carModel[5].carModelName,
    ],
    datasets: [
      {
        label: "Male",
        data: [
          carModel[0].maleClick,
          carModel[1].maleClick,
          carModel[2].maleClick,
          carModel[3].maleClick,
          carModel[4].maleClick,
          carModel[5].maleClick,
        ],
        backgroundColor: "rgb(33, 150, 243)",
      },
      {
        label: "Female",
        data: [
          carModel[0].femaleClick,
          carModel[1].femaleClick,
          carModel[2].femaleClick,
          carModel[3].femaleClick,
          carModel[4].femaleClick,
          carModel[5].femaleClick,
        ],
        backgroundColor: "rgb(255, 234, 0)",
      },
    ],
  };
  return <Bar data={data} height={300} width={600} options={options} />;
};

export default BarChart;
