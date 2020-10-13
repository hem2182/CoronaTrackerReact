import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { fetchDailyData } from "../../api";

// the below is just a react wrapper for chart.js
import { Line } from "react-chartjs-2";

import styles from "./ChartForDoublingRate.module.css";

const ChartForRate = ({
  data: { TotalConfirmed, TotalRecovered, TotalDeaths },
  country,
}) => {
  const [dailyData, setDailyData] = useState([]);
  useEffect(() => {
    // this does not have async counterpart like componentDidMount
    const fetchAPI = async () => {
      let dailyDataArray = [];
      console.log("logging country value from chart component");
      console.log(country);

      const result = await fetchDailyData(country);

      if (result) {
        result.forEach((element, index) => {
          if (index === 0) {
            dailyDataArray.push({
              TotalConfirmed: element.Confirmed,
              TotalDeaths: element.Deaths,
              TotalRecovered: element.Recovered,
              TotalActive: element.Active,
              Country: element.Country,
              date: element.Date,
            });
          } else {
            dailyDataArray.push({
              TotalConfirmed: element.Confirmed - result[index - 1].Confirmed,
              TotalDeaths: element.Deaths - result[index - 1].Deaths,
              TotalRecovered: element.Recovered - result[index - 1].Recovered,
              TotalActive: element.Active - result[index - 1].Active,
              Country: element.Country,
              date: element.Date,
            });
          }
        });
      }
      //console.log(dailyDataArray);
      setDailyData(dailyDataArray);
    };

    fetchAPI();
  }, [country]);

  // we are going to have 2 different charts. line chart for global. bar chart for specific country
  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => new Date(date).toDateString()),
        datasets: [
          {
            data: dailyData.map((data) =>
              Math.round((data.TotalRecovered / data.TotalConfirmed) * 100, 0)
            ),
            label: "Recovery Rate",
            borderColor: "green",
            backgroundColor: "rgba(0, 255, 0, 0.5)",
            fill: false,
          },
          {
            data: dailyData.map((data) =>
              Math.round((data.TotalDeaths / data.TotalConfirmed) * 100, 0)
            ),
            label: "Death Rate",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: false,
          },
        ],
      }}
    />
  ) : null;

  const lineWithHighChartsOptions = {
    chart: {
      type: "line",
    },
    title: {
      text: "Recovery and Death Rate Overview",
    },
    subtitle: {
      text: `Country: ${country === "" ? "India" : country.toUpperCase()}`,
    },
    xAxis: {
      categories: dailyData.map(({ date }) =>
        new Date(date).toLocaleDateString()
      ),
    },
    yAxis: {
      title: {
        text: "Recovery and Death Rate (%)",
      },
    },
    plotOptions: {
      line: {
        // dataLabels: {
        //   enabled: true,
        // },
        enableMouseTracking: true,
      },
    },
    series: [
      {
        name: "Recovery Rate",
        data: dailyData.map((data) =>
          Math.round((data.TotalRecovered / data.TotalConfirmed) * 100, 0)
        ),
      },
      {
        name: "Death Rate",
        data: dailyData.map((data) =>
          Math.round((data.TotalDeaths / data.TotalConfirmed) * 100, 0)
        ),
      },
    ],
  };

  // return <div className={styles.container}>{lineChart}</div>;
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={lineWithHighChartsOptions}
      />
    </div>
  );
};

export default ChartForRate;
