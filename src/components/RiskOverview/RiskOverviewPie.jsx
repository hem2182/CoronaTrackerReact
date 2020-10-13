import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { loadCSS } from "fg-loadcss";

import { Pie } from "react-chartjs-2";

import styles from "./RiskOverviewPie.module.css";

const RiskOverviewPie = ({ Data }) => {
  React.useEffect(() => {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );
  }, []);

  const Unaffected = Data.filter((x) => x.TotalConfirmed === 0);
  const VeryLow = Data.filter(
    (x) =>
      x.TotalConfirmed - x.TotalRecovered - x.TotalDeaths < 100 &&
      x.TotalConfirmed - x.TotalRecovered - x.TotalDeaths > 0
  );
  const Low = Data.filter(
    (x) =>
      x.TotalConfirmed - x.TotalRecovered - x.TotalDeaths < 1000 &&
      x.TotalConfirmed - x.TotalRecovered - x.TotalDeaths > 100
  );
  const Mild = Data.filter(
    (x) =>
      x.TotalConfirmed - x.TotalRecovered - x.TotalDeaths < 10000 &&
      x.TotalConfirmed - x.TotalRecovered - x.TotalDeaths > 1000
  );
  const Moderate = Data.filter(
    (x) =>
      x.TotalConfirmed - x.TotalRecovered - x.TotalDeaths < 50000 &&
      x.TotalConfirmed - x.TotalRecovered - x.TotalDeaths > 10000
  );
  const High = Data.filter(
    (x) =>
      x.TotalConfirmed - x.TotalRecovered - x.TotalDeaths < 100000 &&
      x.TotalConfirmed - x.TotalRecovered - x.TotalDeaths > 50000
  );
  const Serious = Data.filter(
    (x) =>
      x.TotalConfirmed - x.TotalRecovered - x.TotalDeaths < 500000 &&
      x.TotalConfirmed - x.TotalRecovered - x.TotalDeaths > 100000
  );
  const Critical = Data.filter(
    (x) => x.TotalConfirmed - x.TotalRecovered - x.TotalDeaths > 500000
  );
  const CoronaFreeCountries = Data.filter(
    (x) =>
      x.TotalConfirmed === x.TotalRecovered + x.TotalDeaths &&
      x.TotalConfirmed !== 0
  );
  console.log("Corona Free Countries");
  console.log(CoronaFreeCountries);
  const CountriesRecovered90Percent = Data.filter((x) => x.RecoveryRate >= 90);
  console.log(CountriesRecovered90Percent);
  const CountriesRecovered75Percent = Data.filter(
    (x) => x.RecoveryRate >= 75 && x.RecoveryRate < 90
  );
  console.log(CountriesRecovered75Percent);
  const CountriesRecovered50Percent = Data.filter(
    (x) => x.RecoveryRate >= 50 && x.RecoveryRate < 75
  );
  console.log(CountriesRecovered50Percent);

  const pieChart = (
    <Pie
      options={{
        tooltips: {
          enabled: true,
        },
        legend: { display: true, position: "left", align: "start" },
        layout: { padding: 0 },
        title: {
          display: true,
          fontColor: "white",
          text: "Countries Risk Severity",
          position: "top",
        },
      }}
      data={{
        labels: [
          "Unaffected",
          "VeryLow < 100",
          "Low < 1000",
          "Mild < 10000",
          "Moderate < 50000",
          "High < 100000",
          "Serious < 500000",
          "Critical > 500000",
        ],
        datasets: [
          {
            data: [
              Unaffected.length,
              VeryLow.length,
              Low.length,
              Mild.length,
              Moderate.length,
              High.length,
              Serious.length,
              Critical.length,
            ],
            backgroundColor: [
              "grey",
              "lightblue",
              "blue",
              "yellow",
              "orange",
              "darkorange",
              "red",
              "brown",
            ],
          },
        ],
      }}
    />
  );

  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Countries Risk Categorization for COVID-19 risk.",
    },
    tooltip: {
      pointFormat:
        "{series.name}{point.condition} Cases in: <b>{point.y:.1f} Countries</b><br />{point.countriesList}",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</br>: {point.y:.1f}",
        },
      },
    },
    series: [
      {
        name: "Risk Severity",
        colorByPoint: true,
        data: [
          {
            countriesList: Unaffected.map((x) => x.Country),
            condition: "(= 0)",
            name: "Unaffected",
            y: Unaffected.length,
            sliced: true,
            selected: true,
          },
          {
            countriesList: VeryLow.map((x) => x.Country),
            condition: "(< 100)",
            name: "VeryLow",
            y: VeryLow.length,
          },
          {
            countriesList: Low.map((x) => x.Country),
            condition: "(< 1K)",
            name: "Low",
            y: Low.length,
          },
          {
            countriesList: Mild.map((x) => x.Country),
            condition: "(< 10K)",
            name: "Mild",
            y: Mild.length,
          },
          {
            countriesList: Moderate.map((x) => x.Country),
            condition: "(< 50K)",
            name: "Moderate",
            y: Moderate.length,
          },
          {
            countriesList: High.map((x) => x.Country),
            condition: "(< 100K)",
            name: "High",
            y: High.length,
          },
          {
            countriesList: Serious.map((x) => x.Country),
            condition: "(> 100K)",
            name: "Serious",
            y: Serious.length,
          },
          {
            countriesList: Critical.map((x) => x.Country),
            condition: "(> 500K)",
            name: "Critical",
            y: Critical.length,
          },
        ],
        showInLegend: false,
      },
    ],
  };

  const pieChartWithHighCharts = (
    <HighchartsReact highcharts={Highcharts} options={options} />
  );

  if (!Data) {
    return "Loading...";
  } else {
    return <div className={styles.container}>{pieChartWithHighCharts}</div>;
  }
};

export default RiskOverviewPie;
