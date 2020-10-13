import React from "react";
import { Grid } from "@material-ui/core";
import MyCard from "./MyCard";

import styles from "./Cards.module.css";

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if (!confirmed) {
    return "Loading...";
  }

  return (
    <div className={styles.container}>
      <Grid container justify="flex-start">
        <MyCard text="Infected" value={confirmed.value} isValueNumber={true} />
        <MyCard text="Recovered" value={recovered.value} isValueNumber={true} />
        <MyCard text="Deaths" value={deaths.value} isValueNumber={true} />
        <MyCard text="Last Updated" value={new Date(lastUpdate).toDateString()} isValueNumber={false} />
      </Grid>
    </div>
  );
};

export default Cards;
