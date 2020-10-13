import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { fetchDailyData } from "../../api";

// the below is just a react wrapper for chart.js
import { Line } from "react-chartjs-2";

import styles from "./Chart.module.css";

const Chart = ({
  data: { TotalConfirmed, TotalRecovered, TotalDeaths },
  country,
}) => {
  const [dailyData, setDailyData] = useState([]);
  useEffect(() => {
    // this does not have async counterpart like componentDidMount
    const fetchAPI = async () => {
      let dailyDataArray = [];
      // console.log("logging country value from chart component");
      // console.log(country);

      const result = await fetchDailyData(country);
      console.log(result);
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

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => new Date(date).toDateString()),
        datasets: [
          {
            data: dailyData.map(({ TotalConfirmed }) => TotalConfirmed),
            label: "Confirmed",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ TotalRecovered }) => TotalRecovered),
            label: "Recovered",
            borderColor: "green",
            backgroundColor: "rgba(0, 255, 0, 0.5)",
            fill: true,
          },
          {
            data: dailyData.map(({ TotalDeaths }) => TotalDeaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
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
      text: "COVID-19 Daily Cases Overview",
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
        name: "Confirmed",
        data: dailyData.map(({ TotalConfirmed }) => TotalConfirmed),
      },
      {
        name: "Death Rate",
        data: dailyData.map(({ TotalDeaths }) => TotalDeaths),
      },
      {
        name: "Recovered",
        data: dailyData.map(({ TotalRecovered }) => TotalRecovered),
      },
    ],
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={lineWithHighChartsOptions}
      />
    </div>
  );

  // return <div className={styles.container}>{lineChart}</div>;
};

export default Chart;

// var n = 172465
// var p = 10
// var x = Math.floor(n/p)
// x
// if (x.toString().length < 6) {
// 	var result = x % 1000 >= 500 ? x + 1000 - x % 1000 : x - x % 1000;
// 	result = result % 1000 >= 5000 ? result + 5000 - result % 5000 : result - result % 5000
// }
// else if (x.toString().length == 6) {
//   console.log('length is 6')
//   var result = x % 1000 >= 500 ? x + 1000 - x % 1000 : x - x % 1000;
//   result = result % 1000 >= 100000 ? result + 100000 - result % 100000 : result - result % 100000
// }
