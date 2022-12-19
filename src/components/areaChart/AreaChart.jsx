import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import axios from "axios";
import { success, error } from "../../helpers/Alert";
import CanvasJSReact from "./canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const AreaChart = () => {
  const { chartData, setChartData } = useContext(AppContext);
  // console.log("chartData", chartData);

  const test = [
    { x: 30, y: 50 },
    { x: 35, y: 45 },
    { x: 40, y: 40 },
    { x: 45, y: 35 },
    { x: 50, y: 30 },
    { x: 55, y: 25 },
  ];

  const getChartData = async () => {
    try {
      const response = await axios.get(
        `https://hospital-ms-api.onrender.com/transactions/monthly`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("response", response);
      if (response.status === 200) {
        // success(response.data.message);
        // setChartData(response.data.chart);
        let date = response.data.chart.map((item) => {
          console.log(item);
        });
      }
    } catch (err) {
      error("Couldn't fetch chart data");
      console.log(err);
    }
  };

  // useEffect(() => {
  //   getChartData();
  // }, []);

  const options = {
    theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Number of transactions completed",
    },
    axisY: {
      title: "Number of transactions",
    },
    data: [
      {
        type: "area",
        xValueFormatString: "MMMM, YYYY",
        yValueFormatString: "#,##0.## transactions",
        dataPoints: chartData,
        // [

        // chartData.map((item) => {
        //   x: new Date(item.x)
        //   y: item.y,
        // })

        // { x: new Date(2021, 5), y: 43 },
        // { x: new Date(2021, 6), y: 34 },
        // { x: new Date(2021, 7), y: 42 },
        // { x: new Date(2021, 8), y: 36 },
        // { x: new Date(2021, 9), y: 64 },
        // { x: new Date(2021, 10), y: 43 },
        // { x: new Date(2021, 11), y: 35 },
        // { x: new Date(2021, 12), y: 47 },
        // { x: new Date(2022, 1), y: 30 },
        // { x: new Date(2022, 2), y: 26 },
        // { x: new Date(2022, 3), y: 35 },
        // { x: new Date(2022, 4), y: 24 },
        // { x: new Date(2022, 5), y: 43 },

        //   { x: new Date(2022, 6, 0), y: 2.2 },
        //   { x: new Date(2022, 7, 0), y: 3.2 },
        //   { x: new Date(2022, 8, 0), y: 2.2 },
        //   { x: new Date(2022, 9, 0), y: 3.9 },
        //   { x: new Date(2022, 10, 0), y: 3.2 },
        //   { x: new Date(2022, 11, 0), y: 4 },
        //   { x: new Date(2022, 12, 0), y: 3.2 },
        // ],
      },
    ],
  };
  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default AreaChart;
