import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { fetchDailyData } from "../../api";

// the below is just a react wrapper for chart.js
import { Line } from "react-chartjs-2";

import styles from "./ChartForDoublingRate.module.css";

const ChartForDoublingRate = ({
  data: { TotalConfirmed, TotalRecovered, TotalDeaths },
  country,
  doublingRate,
}) => {
  const [dailyData, setDailyData] = useState([]);
  const [doublingRateData, setDoublingRateData] = useState([]);

  useEffect(() => {
    // this does not have async counterpart like componentDidMount
    const fetchAPI = async () => {
      let dailyDataArray = [];
      let doublingRateDataArray = [];
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

      if (doublingRate !== 0) {
        console.log(
          "doubling rate from Doubling rate component.",
          doublingRate
        );
        for (let rate = 1; rate <= 10; rate++) {
          let value = result.filter((x) => {
            if (x.Confirmed >= doublingRate * rate) {
              return x;
            }
          });
          if (value.length > 0) {
            doublingRateDataArray.push({
              Confirmed: value[0].Confirmed,
              Recovered: value[0].Recovered,
              Active: value[0].Active,
              Deaths: value[0].Deaths,
              Country: value[0].Country,
              date: value[0].Date,
            });
          }
        }
        console.log("doubling rate array", doublingRateDataArray);
      }

      setDailyData(dailyDataArray);
      setDoublingRateData(doublingRateDataArray);
    };

    fetchAPI();
  }, [country, doublingRate]);

  // we are going to have 2 different charts. line chart for global. bar chart for specific country
  const lineChart = doublingRateData.length ? (
    <Line
      options={{
        title: {
          text: `Doubling Rate for ${
            country === "" ? "India" : country.toUpperCase()
          }`,
          display: true,
        },
      }}
      data={{
        labels: doublingRateData.map(({ date }) =>
          new Date(date).toDateString()
        ),
        datasets: [
          {
            data: doublingRateData.map((data) => data.Confirmed),
            label: "Confirmed",
            borderColor: "green",
            backgroundColor: "rgba(0, 255, 0, 0.5)",
            fill: false,
          },
        ],
      }}
    />
  ) : null;

  // return <div className={styles.container}>{lineChart}</div>;

  const lineWithHighChartsOptions = {
    chart: {
      type: "line",
    },
    title: {
      text: "COVID-19 Doubling Rate Overview",
    },
    subtitle: {
      text: `Country: ${country === "" ? "India" : country.toUpperCase()}`,
    },
    xAxis: {
      categories: doublingRateData.map(({ date }) =>
        new Date(date).toLocaleDateString()
      ),
    },
    yAxis: {
      title: {
        text: "Doubling Rate",
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
        data: doublingRateData.map((data) => data.Confirmed),
      },
      {
        name: "Deaths",
        data: doublingRateData.map((data) => data.Deaths),
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
};

export default ChartForDoublingRate;
