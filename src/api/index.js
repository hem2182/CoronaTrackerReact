import axios from "axios";

// const url = "https://covid19.mathdro.id/api";
const url = "https://api.covid19api.com";

const newsUrl = "http://newsapi.org/v2";
const newsApiKey = "b3c34d71f7e342f5a37a56981fe8d66d";

export const fetchData = async (country) => {
  let changedUrl = url;

  if (country) {
    changedUrl = `${url}/countries/${country}`;
  } else {
    changedUrl = `${url}/summary`;
  }

  try {
    const {
      data: { Global, Countries, Date },
    } = await axios.get(changedUrl);
    return { Global, Countries, Date };
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountryData = async (country) => {
  let changedUrl = url;

  if (country) {
    changedUrl = `${url}/total/country/${country}`;
  } else {
    changedUrl = `${url}/summary`;
  }

  try {
    const { data } = await axios.get(changedUrl);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async (country) => {
  try {
    let changedUrl = url;
    if (country === "") {
      changedUrl = `${url}/total/dayone/country/india`;
    } else {
      changedUrl = `${url}/total/dayone/country/${country}`;
    }
    const { data } = await axios.get(changedUrl);
    // let modifiedData = data.map((dailyData, index) => {
    //   console.log(index);
    //   if (index === 0) {
    //     dailyDataArray.push({
    //       TotalConfirmed: dailyData.Confirmed,
    //       TotalDeaths: dailyData.Deaths,
    //       TotalRecovered: dailyData.Recovered,
    //       TotalActive: dailyData.Active,
    //       date: dailyData.Date,
    //     });
    //   } else {
    //     dailyDataArray.push({
    //       TotalConfirmed: dailyData.Confirmed - dailyData[index - 1].Confirmed,
    //       TotalDeaths: dailyData.Deaths - dailyData[index - 1].Deaths,
    //       TotalRecovered: dailyData.Recovered - dailyData[index - 1].Recovered,
    //       TotalActive: dailyData.Active - dailyData[index - 1].Active,
    //       date: dailyData.Date,
    //     });
    //   }
    // });
    // console.log("daily data");
    // console.log(dailyDataArray);
    // console.log(modifiedData);
    return data;
  } catch (error) {}
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    return countries; //.map((country) => country.name);
  } catch (error) {}
};

const fetchDataForCountries = async (countryIso3) => {
  try {
    const data = await axios.get(`${url}/countries/${countryIso3}`);
    return data; //.map((country) => country.name);
  } catch (error) {}
};

export const fetchAllCountriesData = async () => {
  try {
    let allCountriesData = [];
    const countries = await fetchCountries();
    return countries.map(async (country) => {
      if (country.iso3 && country.iso3 !== "GMB" && country.iso3 !== "CZE") {
        const { data } = await fetchDataForCountries(country.iso3);
        if (data) {
          allCountriesData.push({
            Country: country.name,
            iso3: country.iso3,
            iso2: country.iso2,
            confirmed: data.confirmed.value,
            deaths: data.deaths.value,
            recovered: data.recovered.value,
            lastUpdate: data.lastUpdate,
          });
        }
      }
    });
  } catch (error) {}
};

export const fetchTopHeadlinesCountryWise = async (country, category) => {};

export const fetchTopHeadlinesFromSource = async (source) => {
  try {
    const {
      data: { articles },
    } = await axios.get(
      `${newsUrl}/top-headlines?apiKey=${newsApiKey}&sources=bbc-news,google-news`
    );
    console.log("News Data");
    console.log(articles);
    return { articles };
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllNews = async (containsWord, fromDate) => {
  try {
    const {
      data: { articles },
    } = await axios.get(
      `${newsUrl}/everything?apiKey=${newsApiKey}&language=en&q=${containsWord}&from=2020-04-26`
    );
    console.log("News Data");
    console.log(articles);
    return { articles };
  } catch (error) {
    console.log(error);
  }
};

// const newsApi = 'b3c34d71f7e342f5a37a56981fe8d66d';

// http://newsapi.org/v2/top-headlines?country=us&apiKey=b3c34d71f7e342f5a37a56981fe8d66d -> Country Wise top headlines  -> /top-headlines endpoint

// http://newsapi.org/v2/top-headlines?apiKey=b3c34d71f7e342f5a37a56981fe8d66d&sources=bbc-news -> From Sources -> cannot mix country and sources

// category=business -> other categories are -> entertainment, health, science, sports, technology

// /everything endpoint
// http://newsapi.org/v2/everything?q=Apple&from=2020-04-26&sortBy=popularity&apiKey=b3c34d71f7e342f5a37a56981fe8d66d

// https://newsapi.org/v2/sources?apiKey=b3c34d71f7e342f5a37a56981fe8d66d -> sources end point -> language=en -> language=en&country=us

// newsapi.org/v2/top-headlines?apiKey=b3c34d71f7e342f5a37a56981fe8d66d&country=us
// newsapi.org/v2/top-headlines?apiKey=b3c34d71f7e342f5a37a56981fe8d66d&country=in

// http://newsapi.org/v2/everything?q=Corona&from=2020-04-26&sortBy=popularity&apiKey=b3c34d71f7e342f5a37a56981fe8d66d
// http://newsapi.org/v2/everything?q=Covid&from=2020-04-26&sortBy=popularity&apiKey=b3c34d71f7e342f5a37a56981fe8d66d
// http://newsapi.org/v2/everything?q=Pandemic&from=2020-04-26&sortBy=popularity&apiKey=b3c34d71f7e342f5a37a56981fe8d66d
// http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=b3c34d71f7e342f5a37a56981fe8d66d
