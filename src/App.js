import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';

class App extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <Cards />
                <CountryPicker />
                <Chart />
            </div>
        )
    }
}

export default App;

// dependencies required.
// 1. npm install --save axios react-chartjs-2 react-countup classnames