import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import styles from "./NavigationMenu.module.css";
import coronaImage from "../../images/covid19Img.png";

const NavigationMenu = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={styles.menuButton}
          color="inherit"
          aria-label="open drawer"
        >
          <MenuIcon />
        </IconButton>
        <img className={styles.image} src={coronaImage} alt="COVID-19"></img>
        <Typography className={styles.title} variant="h6" noWrap>
          Footprints
        </Typography>
        {/* <CountryPicker
          handleCountryChange={this.handleCountryChange}
          className={styles.right}
        /> */}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationMenu;
