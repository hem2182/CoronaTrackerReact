import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';

import coronaImage from './images/covid19Img.png';

// whenever you have index files, you don't need to specify index.
// By default, react looks for index.js file if not specified.
import { fetchData } from './api';

class App extends React.Component {

    state = {
        // you could have used constructor instead of this but that's lengthy.
        // using state automatically invokes the constructor in code behind.
        data: {},
        country: '',
    }

    async componentDidMount() {
        // this is the best place to fetch data from service/api in a class based component.
        const fetchedData = await fetchData();
        this.setState({ data: fetchedData })
    }

    handleCountryChange = async (country) => {
        // fetch the data first and then set the state.
        const fetchedData = await fetchData(country);
        this.setState({ data: fetchedData, country: country });
    }

    render() {

        const { data, country } = this.state;

        return (
            <div className={styles.container}>
                <img className={styles.image} src={coronaImage} alt="COVID-19"></img>
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country} />
            </div>
        )
    }
}

export default App;

// dependencies required.
// 1. npm install --save axios react-chartjs-2 react-countup classnames @material-ui/core chart.js
// 2. we will only have App as class component and rest all are functional components with hooks.
// 3. whenever a component becomes too complex, switch from functional to class components.
// 4. use class components for things like async calls and with multiple use effects with the hooks.
