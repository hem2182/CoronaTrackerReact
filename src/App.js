import React from "react";
import { Grid } from "@material-ui/core";
import {
  NavigationMenu,
  InfoCard,
  Notification,
  CountriesData,
  RiskOverviewPie,
  Chart,
  ChartForRate,
} from "./components";

import styles from "./App.module.css";

// whenever you have index files, you don't need to specify index. By default, react looks for index.js file if not specified.
import {
  fetchData,
  fetchCountryData,
  fetchAllNews,
  fetchTopHeadlinesFromSource,
} from "./api";
import ChartForDoublingRate from "./components/Chart/ChartForDoublingRate";
import CountriesComparatorChart from "./components/Chart/CountriesComparatorChart";

let CountriesInfoData = [];

class App extends React.Component {
  state = {
    // you could have used constructor instead of this but that's lengthy. using state automatically invokes the constructor in code behind.
    GlobalData: [],
    CountriesData: [],
    DoublingRate: 5000,
    CoronaNews: [],
    Date: "",
    country: "",
    tabValue: 0,
  };

  handleChange = (event, newTabValue) => {
    this.setState({ tabValue: newTabValue });
  };

  async componentDidMount() {
    // this is the best place to fetch data from service/api in a class based component.
    let CountriesDataArray = [];
    const newsData = await fetchTopHeadlinesFromSource();
    const fetchedData = await fetchData();
    const result = fetchedData.Countries;
    console.log(result);
    if (result) {
      result.forEach((element, index) => {
        CountriesDataArray.push({
          TotalConfirmed: element.TotalConfirmed,
          TotalDeaths: element.TotalDeaths,
          TotalRecovered: element.TotalRecovered,
          TotalActive:
            element.TotalConfirmed === 0
              ? 0
              : element.TotalConfirmed -
                element.TotalRecovered -
                element.TotalDeaths,
          NewConfirmed: element.NewConfirmed,
          NewDeaths: element.NewDeaths,
          NewRecovered: element.NewRecovered,
          Country: element.Country,
          CountryCode: element.CountryCode,
          Date: element.Date,
          RecoveryRate:
            element.TotalConfirmed === 0
              ? 0
              : Math.round(
                  (element.TotalRecovered / element.TotalConfirmed) * 100,
                  0
                ),
          DeathRate:
            element.TotalConfirmed === 0
              ? 0
              : Math.round(
                  (element.TotalDeaths / element.TotalConfirmed) * 100,
                  0
                ),
        });
      });
    }
    console.log(CountriesDataArray);
    this.setState({
      GlobalData: fetchedData.Global,
      CountriesData: CountriesDataArray,
      Date: fetchedData.Date,
      CoronaNews: newsData,
    });
    CountriesInfoData = this.state.CountriesData;
  }

  computeDoublingRate = (number) => {
    let result = 0;
    var p = 10;
    var x = Math.floor(number / p);
    if (x.toString().length < 6) {
      if (x < 5000) {
        result = x % 1000 >= 500 ? x + 1000 - (x % 1000) : x - (x % 1000);
      } else {
        result = x % 1000 >= 500 ? x + 1000 - (x % 1000) : x - (x % 1000);
        result =
          result % 1000 >= 5000
            ? result + 5000 - (result % 5000)
            : result - (result % 5000);
      }
    } else if (x.toString().length === 6) {
      console.log("length is 6");
      result = x % 1000 >= 500 ? x + 1000 - (x % 1000) : x - (x % 1000);
      result =
        result % 1000 >= 100000
          ? result + 100000 - (result % 100000)
          : result - (result % 100000);
    }
    console.log("Doubling rate:", result);
    return result;
  };

  handleFilteredCountry = (country) => {
    if (country) {
      const countryData = async () => {
        var data = await fetchCountryData(country);
        if (data) {
          console.log(data);
          console.log(data.length);

          const { Country, CountryCode, Confirmed, Deaths, Recovered } = data[
            data.length - 1
          ];
          const newCasesData = data[data.length - 2];
          console.log(newCasesData);
          const newDataToAssign = [
            {
              Country,
              CountryCode,
              TotalConfirmed: Confirmed,
              TotalDeaths: Deaths,
              TotalRecovered: Recovered,
              TotalActive: Confirmed === 0 ? 0 : Confirmed - Recovered - Deaths,
              NewConfirmed: Confirmed - newCasesData.Confirmed,
              NewDeaths: Deaths - newCasesData.Deaths,
              NewRecovered: Recovered - newCasesData.Recovered,
              RecoveryRate:
                Confirmed === 0
                  ? 0
                  : Math.round((Recovered / Confirmed) * 100, 0),
              DeathRate:
                Confirmed === 0 ? 0 : Math.round((Deaths / Confirmed) * 100, 0),
            },
          ];
          const rate = this.computeDoublingRate(
            newDataToAssign[0].TotalConfirmed
          );
          this.setState({
            CountriesData: newDataToAssign,
            country: country,
            DoublingRate: rate,
          });
        }
      };
      countryData();
    } else {
      this.setState({
        CountriesData: CountriesInfoData,
      });
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <NavigationMenu />
        <div className={styles.bodyContainer}>
          <Grid container spacing={1}>
            <Grid item className={styles.infoContainer} xs={2}>
              <InfoCard
                Global={this.state.GlobalData}
                lastUpdate={this.state.Date}
              />
            </Grid>
            <Grid item className={styles.infoContainer} xs={6}>
              <CountriesData
                Data={this.state.CountriesData}
                filterCountry={this.handleFilteredCountry}
              />
            </Grid>
            <Grid item className={styles.infoContainer} xs={4}>
              {/* <RiskOverview Data={this.state.CountriesData} /> */}
              <RiskOverviewPie Data={this.state.CountriesData} />
            </Grid>
            {/* Data Container */}
            <Grid item xs={9}>
              <Grid
                container
                spacing={0}
                className={styles.information}
                direction="row"
              >
                <Grid item xs={4} className={styles.infoContainer}>
                  <Chart
                    data={this.state.CountriesData}
                    country={this.state.country}
                  />
                </Grid>
                <Grid item xs={4} className={styles.infoContainer}>
                  <ChartForRate
                    data={this.state.CountriesData}
                    country={this.state.country}
                  />
                </Grid>
                <Grid item xs={4} className={styles.infoContainer}>
                  <ChartForDoublingRate
                    data={this.state.CountriesData}
                    country={this.state.country}
                    doublingRate={this.state.DoublingRate}
                  />
                </Grid>
                <Grid item xs={12} className={styles.infoContainer}>
                  <CountriesComparatorChart />
                </Grid>
              </Grid>
            </Grid>

            {/* Notification Grid */}
            <Grid item xs={3}>
              <Notification CoronaNews={this.state.CoronaNews} />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;

// dependencies required.
// 1. npm install --save axios react-chartjs-2 react-countup classnames @material-ui/core chart.js

// Functionalities to implement
// 1. all state province view in a country
// 2. map view for world through high charts
// 4. selected countries graph comparison
// 5. corona news and economy impact news and country specific news on country filter
