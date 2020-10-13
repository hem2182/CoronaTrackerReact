import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Card,
  CardContent,
} from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // width: 500,
  },
}));

function NotificationContent({ ContentData }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        {/* <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {ContentData.title}
        </Typography> */}
        <Typography variant="body2" component="p">
          {ContentData.title}
        </Typography>
        {/* <Typography variant="body2" component="p">
          {ContentData.content}
        </Typography> */}
        <Typography className={classes.pos} color="textSecondary">
          {ContentData.source.name}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function Notification({ CoronaNews }) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  console.log(CoronaNews);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="standard"
          aria-label="full width tabs example"
        >
          <Tab label="COVID-19" {...a11yProps(0)} />
          <Tab label="Economy" {...a11yProps(1)} />
          {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
        style={{ maxHeight: 750 }}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {CoronaNews.articles &&
            CoronaNews.articles.map((data) => (
              <NotificationContent ContentData={data} />
            ))}
          {/* {CoronaNews && (
            <NotificationContent
              ContentData={{
                title: "Sample Title 1",
                content: "Sample Content 1",
                author: "Sample Author 1",
              }}
            />
          )} */}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
