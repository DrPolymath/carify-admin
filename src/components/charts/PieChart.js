import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ carBrand }) => {
  const data = {
    labels: [
      carBrand[0].carBrandName,
      carBrand[1].carBrandName,
      carBrand[2].carBrandName,
      carBrand[3].carBrandName,
      carBrand[4].carBrandName,
      carBrand[5].carBrandName,
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [
          carBrand[0].totalClick,
          carBrand[1].totalClick,
          carBrand[2].totalClick,
          carBrand[3].totalClick,
          carBrand[4].totalClick,
          carBrand[5].totalClick,
        ],
        backgroundColor: [
          "rgb(33, 150, 243)",
          "rgb(60, 126, 232)",
          "rgb(165, 197, 255)",
          "rgb(227, 186, 39)",
          "rgb(255, 234, 0)",
          "rgb(255, 255, 168)",
        ],
        borderColor: [
          "rgb(33, 150, 243)",
          "rgb(60, 126, 232)",
          "rgb(165, 197, 255)",
          "rgb(227, 186, 39)",
          "rgb(255, 234, 0)",
          "rgb(255, 255, 168)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Pie
      data={data}
      options={{ responsive: true, maintainAspectRatio: true }}
    />
  );
};

export default PieChart;
