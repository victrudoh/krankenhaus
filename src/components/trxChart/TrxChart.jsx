import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";

//style
import { Wrapper } from "./TrxChart.Styles";

const TrxChart = () => {
  const { chartData } = useContext(AppContext);
  console.log(
    "🚀 ~ file: TrxChart.jsx ~ line 8 ~ TrxChart ~ chartData",
    chartData
  );

  return (
    <>
      <Wrapper>
        <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
          <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
            tickFormat={[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ]}
          />
          <VictoryAxis
            dependentAxis
            // tickFormat specifies how ticks should be displayed
            tickFormat={(x) => x}
          />
          <VictoryBar
            style={{ data: { fill: "#000080" } }}
            data={chartData}
            alignment="middle"
            // data accessor for x values
            x="x"
            // data accessor for y values
            y="y"
          />
        </VictoryChart>
      </Wrapper>
    </>
  );
};

export default TrxChart;
