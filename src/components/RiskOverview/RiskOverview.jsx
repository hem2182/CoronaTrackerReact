import React from "react";
import { loadCSS } from "fg-loadcss";
import LanguageIcon from "@material-ui/icons/Language";
import CountUp from "react-countup";

import styles from "./RiskOverview.module.css";

//import { fetchData } from "../../api";

const RiskOverview = ({ Data }) => {
  React.useEffect(() => {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );
  }, []);

  const Unaffected = Data.filter((x) => x.TotalConfirmed === 0);
  const VeryLow = Data.filter(
    (x) => x.TotalConfirmed < 100 && x.TotalConfirmed > 0
  );
  const Low = Data.filter(
    (x) => x.TotalConfirmed < 1000 && x.TotalConfirmed > 100
  );
  const Mild = Data.filter(
    (x) => x.TotalConfirmed < 10000 && x.TotalConfirmed > 1000
  );
  const Moderate = Data.filter(
    (x) => x.TotalConfirmed < 50000 && x.TotalConfirmed > 10000
  );
  const High = Data.filter(
    (x) => x.TotalConfirmed < 100000 && x.TotalConfirmed > 50000
  );
  const Serious = Data.filter(
    (x) => x.TotalConfirmed < 500000 && x.TotalConfirmed > 100000
  );
  const Critical = Data.filter((x) => x.TotalConfirmed > 500000);
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

  if (!Data) {
    return "Loading...";
  } else {
    return (
      <div className={styles.container}>
        <header className={styles.heading}>
          <h2>Countries Severity</h2>
          <LanguageIcon className={styles.icon} fontSize="large" />
        </header>
        <div className={styles.description}>
          <table className={styles.descriptionItem}>
            <tbody>
              {/* <tr>
                <td className={styles.info}>CountriesRecoveryRate(>90%)</td>
                <td className={styles.infoValue}>
                  {CountriesRecovered90Percent.length}
                </td>
              </tr>
              <tr>
                <td className={styles.info}>CountriesRecoveryRate(>75%)</td>
                <td className={styles.infoValue}>
                  {CountriesRecovered75Percent.length}
                </td>
              </tr>
              <tr>
                <td className={styles.info}>CountriesRecoveryRate(>50%)</td>
                <td className={styles.infoValue}>
                  {CountriesRecovered50Percent.length}
                </td>
              </tr> */}
              <tr>
                <td className={styles.info}>CoronaFreeCountries</td>
                <td className={styles.infoValue}>
                  <CountUp
                    start={0}
                    end={CoronaFreeCountries.length}
                    duration={1}
                    separator=","
                  />
                </td>
              </tr>
              <tr>
                <td className={styles.info}>Critical(>500K)</td>
                <td className={styles.infoValue}>
                  <CountUp
                    start={0}
                    end={Critical.length}
                    duration={1}
                    separator=","
                  />
                </td>
              </tr>
              <tr>
                <td className={styles.info}>Serious(>100K)</td>
                <td className={styles.infoValue}>
                  <CountUp
                    start={0}
                    end={Serious.length}
                    duration={1}
                    separator=","
                  />
                </td>
              </tr>
              <tr>
                <td className={styles.info}>High({"<"}100K)</td>
                <td className={styles.infoValue}>
                  <CountUp
                    start={0}
                    end={High.length}
                    duration={1}
                    separator=","
                  />
                </td>
              </tr>
              <tr>
                <td className={styles.info}>Moderate({"<"}50K)</td>
                <td className={styles.infoValue}>
                  <CountUp
                    start={0}
                    end={Moderate.length}
                    duration={1}
                    separator=","
                  />
                </td>
              </tr>
              <tr>
                <td className={styles.info}>Mild({"<"}10K)</td>
                <td className={styles.infoValue}>
                  <CountUp
                    start={0}
                    end={Mild.length}
                    duration={1}
                    separator=","
                  />
                </td>
              </tr>
              <tr>
                <td className={styles.info}>Low({"<"}1K)</td>
                <td className={styles.infoValue}>
                  <CountUp
                    start={0}
                    end={Low.length}
                    duration={1}
                    separator=","
                  />
                </td>
              </tr>
              <tr>
                <td className={styles.info}>Very Low({"<"}100)</td>
                <td className={styles.infoValue}>
                  <CountUp
                    start={0}
                    end={VeryLow.length}
                    duration={1}
                    separator=","
                  />
                </td>
              </tr>
              <tr>
                <td className={styles.info}>Unaffected(=0)</td>
                <td className={styles.infoValue}>
                  <CountUp
                    start={0}
                    end={Unaffected.length}
                    duration={1}
                    separator=","
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default RiskOverview;
