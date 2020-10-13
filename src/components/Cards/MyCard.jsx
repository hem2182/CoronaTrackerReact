import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";

// the classnames module helps us to provide multiple styles simultaneously.
import cx from "classnames";

import styles from "./MyCard.module.css";

const MyCard = ({ text, value, isValueNumber }) => {
  if (!value) {
    return "Loading...";
  }

  return (
    <Grid item component={Card} className={cx(styles.card, styles.infected)}>
    <CardContent>
    <Typography color="textSecondary" gutterBottom>{text}</Typography>
    {
      isValueNumber
      ? (<Typography variant="h5"><CountUp start={0} end={value} duration={1} separator="," /></Typography>)
      : (<Typography color="textSecondary" gutterBottom>{value}</Typography>)
    }
    </CardContent>
    </Grid>
    );
  };

  export default MyCard;
