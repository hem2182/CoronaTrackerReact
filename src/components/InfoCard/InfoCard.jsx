import React from "react";
import { loadCSS } from "fg-loadcss";
import LanguageIcon from "@material-ui/icons/Language";
import { green, red } from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";
import CountUp from "react-countup";

import styles from "./InfoCard.module.css";

//import { fetchData } from "../../api";

const InfoCard = ({
  Global: { TotalConfirmed, TotalRecovered, TotalDeaths },
  lastUpdate,
}) => {
  React.useEffect(() => {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );
  }, []);
  if (!TotalConfirmed) {
    return "Loading...";
  } else {
    return (
      <div className={styles.container}>
        <header className={styles.heading}>
          <h2>Global</h2>
          <LanguageIcon className={styles.icon} fontSize="large" />
        </header>
        <div className={styles.description}>
          <table className={styles.descriptionItem}>
            <tbody>
              <tr>
                <td className={styles.info}>Confirmed</td>
                <td className={styles.infoValue}>
                  <CountUp
                    start={0}
                    end={TotalConfirmed}
                    duration={1}
                    separator=","
                  />
                </td>
              </tr>
              <tr>
                <td className={styles.info}>
                  Recovered
                  <Icon
                    className="fas fa-heartbeat"
                    fontSize="small"
                    style={{ color: green[500] }}
                  />
                </td>
                <td className={styles.infoValue}>
                  <CountUp
                    start={0}
                    end={TotalRecovered}
                    duration={1}
                    separator=","
                  />
                </td>
              </tr>
              <tr>
                <td className={styles.info}>
                  <span>Deaths</span>
                  <Icon
                    className="fas fa-heart-broken"
                    fontSize="small"
                    style={{ color: red[500] }}
                  />
                </td>
                <td className={styles.infoValue}>
                  <CountUp
                    start={0}
                    end={TotalDeaths}
                    duration={1}
                    separator=","
                  />
                </td>
              </tr>
              <tr>
                <td className={styles.info}>Active</td>
                <td className={styles.infoValue}>
                  <CountUp
                    start={0}
                    end={TotalConfirmed - TotalRecovered - TotalDeaths}
                    duration={1}
                    separator=","
                  />
                </td>
              </tr>
              <tr>
                <td className={styles.info}>Recovery Rate</td>
                <td className={styles.infoValue}>
                  {Math.round((TotalRecovered / TotalConfirmed) * 100)}%
                </td>
              </tr>
              <tr>
                <td className={styles.info}>Death Rate</td>
                <td className={styles.infoValue}>
                  {Math.round((TotalDeaths / TotalConfirmed) * 100)}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <footer>Last Updated: {new Date(lastUpdate).toDateString()}</footer>
      </div>
    );
  }
};

export default InfoCard;
