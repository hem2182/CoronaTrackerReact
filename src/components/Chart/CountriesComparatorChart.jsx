import React from "react";
import Highcharts from "highcharts/highmaps";
import HighchartsReact from "highcharts-react-official";
import mapDataIE from "@highcharts/map-collection/countries/ie/ie-all.geo.json";
import worldPopulationData from "../../AppData/world-population.json";
import proj4 from "proj4";

import highchartsMap from "highcharts/modules/map";

if (typeof window !== "undefined") {
  window.proj4 = window.proj4 || proj4;
}

highchartsMap(Highcharts);

const lineWithDataLabels = {
  chart: {
    type: "line",
  },
  title: {
    text: "Monthly Average Temperature",
  },
  subtitle: {
    text: "Source: WorldClimate.com",
  },
  xAxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  yAxis: {
    title: {
      text: "Temperature (°C)",
    },
  },
  plotOptions: {
    line: {
      dataLabels: {
        enabled: true,
      },
      enableMouseTracking: false,
    },
  },
  series: [
    {
      name: "Tokyo",
      data: [
        7.0,
        6.9,
        9.5,
        14.5,
        18.4,
        21.5,
        25.2,
        26.5,
        23.3,
        18.3,
        13.9,
        9.6,
      ],
    },
    {
      name: "London",
      data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8],
    },
  ],
};

const options = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: "pie",
  },
  title: {
    text: "Browser market shares in January, 2018",
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
  },
  accessibility: {
    point: {
      valueSuffix: "%",
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true,
        format: "<b>{point.name}</b>: {point.percentage:.1f} %",
      },
    },
  },
  series: [
    {
      name: "Brands",
      colorByPoint: true,
      data: [
        {
          name: "Chrome",
          y: 61.41,
          sliced: true,
          selected: true,
        },
        {
          name: "Internet Explorer",
          y: 11.84,
        },
        {
          name: "Firefox",
          y: 10.85,
        },
        {
          name: "Edge",
          y: 4.67,
        },
        {
          name: "Safari",
          y: 4.18,
        },
        {
          name: "Sogou Explorer",
          y: 1.64,
        },
        {
          name: "Opera",
          y: 1.6,
        },
        {
          name: "QQ",
          y: 1.2,
        },
        {
          name: "Other",
          y: 2.61,
        },
      ],
    },
  ],
};

const stackedAreaOptions = {
  chart: {
    type: "area",
  },
  title: {
    text: "Historic and Estimated Worldwide Population Growth by Region",
  },
  subtitle: {
    text: "Source: Wikipedia.org",
  },
  xAxis: {
    categories: ["1750", "1800", "1850", "1900", "1950", "1999", "2050"],
    tickmarkPlacement: "on",
    title: {
      enabled: false,
    },
  },
  yAxis: {
    title: {
      text: "Billions",
    },
    labels: {
      formatter: function () {
        return this.value / 1000;
      },
    },
  },
  tooltip: {
    split: true,
    valueSuffix: " millions",
  },
  plotOptions: {
    area: {
      stacking: "normal",
      lineColor: "#666666",
      lineWidth: 1,
      marker: {
        lineWidth: 1,
        lineColor: "#666666",
      },
    },
  },
  series: [
    {
      name: "Asia",
      data: [502, 635, 809, 947, 1402, 3634, 5268],
    },
    {
      name: "Africa",
      data: [106, 107, 111, 133, 221, 767, 1766],
    },
    {
      name: "Europe",
      data: [163, 203, 276, 408, 547, 729, 628],
    },
    {
      name: "America",
      data: [18, 31, 54, 156, 339, 818, 1201],
    },
    {
      name: "Oceania",
      data: [2, 2, 2, 6, 13, 30, 46],
    },
  ],
};

const mapCountriesData = [
  { code: "abw", name: "Aruba", value: 582 },
  { code: "ago", name: "Angola", value: 23 },
  { code: "alb", name: "Albania", value: 105 },
  { code: "and", name: "Andorra", value: 164 },
  { code: "are", name: "United Arab Emirates", value: 111 },
  { code: "arg", name: "Argentina", value: 16 },
  { code: "arm", name: "Armenia", value: 103 },
  { code: "asm", name: "American Samoa", value: 278 },
  { code: "atg", name: "Antigua and Barbuda", value: 229 },
  { code: "aus", name: "Australia", value: 3 },
  { code: "aut", name: "Austria", value: 106 },
  { code: "aze", name: "Azerbaijan", value: 118 },
  { code: "bdi", name: "Burundi", value: 410 },
  { code: "bel", name: "Belgium", value: 375 },
  { code: "ben", name: "Benin", value: 96 },
  { code: "bfa", name: "Burkina Faso", value: 68 },
  { code: "bgd", name: "Bangladesh", value: 1252 },
  { code: "bgr", name: "Bulgaria", value: 66 },
  { code: "bhr", name: "Bahrain", value: 1848 },
  { code: "bhs", name: "Bahamas The", value: 39 },
  { code: "bih", name: "Bosnia and Herzegovina", value: 69 },
  { code: "blr", name: "Belarus", value: 47 },
  { code: "blz", name: "Belize", value: 16 },
  { code: "bmu", name: "Bermuda", value: 1307 },
  { code: "bol", name: "Bolivia", value: 10 },
  { code: "bra", name: "Brazil", value: 25 },
  { code: "brb", name: "Barbados", value: 663 },
  { code: "brn", name: "Brunei Darussalam", value: 80 },
  { code: "btn", name: "Bhutan", value: 21 },
  { code: "bwa", name: "Botswana", value: 4 },
  { code: "caf", name: "Central African Republic", value: 7 },
  { code: "can", name: "Canada", value: 4 },
  { code: "che", name: "Switzerland", value: 212 },
  { code: "chi", name: "Channel Islands", value: 866 },
  { code: "chl", name: "Chile", value: 24 },
  { code: "chn", name: "China", value: 147 },
  { code: "civ", name: "Cote d'Ivoire", value: 75 },
  { code: "cmr", name: "Cameroon", value: 50 },
  { code: "cod", name: "Congo Dem. Rep.", value: 35 },
  { code: "cog", name: "Congo Rep.", value: 15 },
  { code: "col", name: "Colombia", value: 44 },
  { code: "com", name: "Comoros", value: 428 },
  { code: "cpv", name: "Cabo Verde", value: 134 },
  { code: "cri", name: "Costa Rica", value: 95 },
  { code: "cub", name: "Cuba", value: 110 },
  { code: "cuw", name: "Curacao", value: 360 },
  { code: "cym", name: "Cayman Islands", value: 253 },
  { code: "cyp", name: "Cyprus", value: 127 },
  { code: "cze", name: "Czech Republic", value: 137 },
  { code: "deu", name: "Germany", value: 237 },
  { code: "dji", name: "Djibouti", value: 41 },
  { code: "dma", name: "Dominica", value: 98 },
  { code: "dnk", name: "Denmark", value: 136 },
  { code: "dom", name: "Dominican Republic", value: 220 },
  { code: "dza", name: "Algeria", value: 17 },
  { code: "ecu", name: "Ecuador", value: 66 },
  { code: "egy", name: "Egypt Arab Rep.", value: 96 },
  { code: "esp", name: "Spain", value: 93 },
  { code: "est", name: "Estonia", value: 31 },
  { code: "eth", name: "Ethiopia", value: 102 },
  { code: "fin", name: "Finland", value: 18 },
  { code: "fji", name: "Fiji", value: 49 },
  { code: "fra", name: "France", value: 122 },
  { code: "fro", name: "Faroe Islands", value: 35 },
  { code: "fsm", name: "Micronesia Fed. Sts.", value: 150 },
  { code: "gab", name: "Gabon", value: 8 },
  { code: "gbr", name: "United Kingdom", value: 271 },
  { code: "geo", name: "Georgia", value: 54 },
  { code: "gha", name: "Ghana", value: 124 },
  { code: "gib", name: "Gibraltar", value: 3441 },
  { code: "gin", name: "Guinea", value: 50 },
  { code: "gmb", name: "Gambia The", value: 201 },
  { code: "gnb", name: "Guinea-Bissau", value: 65 },
  { code: "gnq", name: "Equatorial Guinea", value: 44 },
  { code: "grc", name: "Greece", value: 83 },
  { code: "grd", name: "Grenada", value: 316 },
  { code: "grl", name: "Greenland", value: 0 },
  { code: "gtm", name: "Guatemala", value: 155 },
  { code: "gum", name: "Guam", value: 302 },
  { code: "guy", name: "Guyana", value: 4 },
  { code: "hkg", name: "Hong Kong SAR China", value: 6997 },
  { code: "hnd", name: "Honduras", value: 81 },
  { code: "hrv", name: "Croatia", value: 75 },
  { code: "hti", name: "Haiti", value: 394 },
  { code: "hun", name: "Hungary", value: 108 },
  { code: "idn", name: "Indonesia", value: 144 },
  { code: "imn", name: "Isle of Man", value: 147 },
  { code: "ind", name: "India", value: 445 },
  { code: "irl", name: "Ireland", value: 69 },
  { code: "irn", name: "Iran Islamic Rep.", value: 49 },
  { code: "irq", name: "Iraq", value: 86 },
  { code: "isl", name: "Iceland", value: 3 },
  { code: "isr", name: "Israel", value: 395 },
  { code: "ita", name: "Italy", value: 206 },
  { code: "jam", name: "Jamaica", value: 266 },
  { code: "jor", name: "Jordan", value: 107 },
  { code: "jpn", name: "Japan", value: 348 },
  { code: "kaz", name: "Kazakhstan", value: 7 },
  { code: "ken", name: "Kenya", value: 85 },
  { code: "kgz", name: "Kyrgyz Republic", value: 32 },
  { code: "khm", name: "Cambodia", value: 89 },
  { code: "kir", name: "Kiribati", value: 141 },
  { code: "kna", name: "St. Kitts and Nevis", value: 211 },
  { code: "kor", name: "Korea Rep.", value: 526 },
  { code: "kwt", name: "Kuwait", value: 227 },
  { code: "lao", name: "Lao PDR", value: 29 },
  { code: "lbn", name: "Lebanon", value: 587 },
  { code: "lbr", name: "Liberia", value: 48 },
  { code: "lby", name: "Libya", value: 4 },
  { code: "lca", name: "St. Lucia", value: 292 },
  { code: "lie", name: "Liechtenstein", value: 235 },
  { code: "lka", name: "Sri Lanka", value: 338 },
  { code: "lso", name: "Lesotho", value: 73 },
  { code: "ltu", name: "Lithuania", value: 46 },
  { code: "lux", name: "Luxembourg", value: 225 },
  { code: "lva", name: "Latvia", value: 32 },
  { code: "mac", name: "Macao SAR China", value: 20406 },
  { code: "maf", name: "St. Martin (French part)", value: 592 },
  { code: "mar", name: "Morocco", value: 79 },
  { code: "mco", name: "Monaco", value: 19250 },
  { code: "mda", name: "Moldova", value: 108 },
  { code: "mdg", name: "Madagascar", value: 43 },
  { code: "mdv", name: "Maldives", value: 1392 },
  { code: "mex", name: "Mexico", value: 66 },
  { code: "mhl", name: "Marshall Islands", value: 295 },
  { code: "mkd", name: "Macedonia FYR", value: 83 },
  { code: "mli", name: "Mali", value: 15 },
  { code: "mlt", name: "Malta", value: 1365 },
  { code: "mmr", name: "Myanmar", value: 81 },
  { code: "mne", name: "Montenegro", value: 46 },
  { code: "mng", name: "Mongolia", value: 2 },
  { code: "mnp", name: "Northern Mariana Islands", value: 120 },
  { code: "moz", name: "Mozambique", value: 37 },
  { code: "mrt", name: "Mauritania", value: 4 },
  { code: "mus", name: "Mauritius", value: 622 },
  { code: "mwi", name: "Malawi", value: 192 },
  { code: "mys", name: "Malaysia", value: 95 },
  { code: "nac", name: "North America", value: 20 },
  { code: "nam", name: "Namibia", value: 3 },
  { code: "ncl", name: "New Caledonia", value: 15 },
  { code: "ner", name: "Niger", value: 16 },
  { code: "nga", name: "Nigeria", value: 204 },
  { code: "nic", name: "Nicaragua", value: 51 },
  { code: "nld", name: "Netherlands", value: 505 },
  { code: "nor", name: "Norway", value: 14 },
  { code: "npl", name: "Nepal", value: 202 },
  { code: "nru", name: "Nauru", value: 652 },
  { code: "nzl", name: "New Zealand", value: 18 },
  { code: "omn", name: "Oman", value: 14 },
  { code: "pak", name: "Pakistan", value: 251 },
  { code: "pan", name: "Panama", value: 54 },
  { code: "per", name: "Peru", value: 25 },
  { code: "phl", name: "Philippines", value: 347 },
  { code: "plw", name: "Palau", value: 47 },
  { code: "png", name: "Papua New Guinea", value: 18 },
  { code: "pol", name: "Poland", value: 124 },
  { code: "pri", name: "Puerto Rico", value: 385 },
  { code: "prk", name: "Korea Dem. People’s Rep.", value: 211 },
  { code: "prt", name: "Portugal", value: 113 },
  { code: "pry", name: "Paraguay", value: 17 },
  { code: "pse", name: "West Bank and Gaza", value: 756 },
  { code: "pyf", name: "French Polynesia", value: 77 },
  { code: "qat", name: "Qatar", value: 221 },
  { code: "rou", name: "Romania", value: 86 },
  { code: "rus", name: "Russian Federation", value: 9 },
  { code: "rwa", name: "Rwanda", value: 483 },
  { code: "sau", name: "Saudi Arabia", value: 15 },
  { code: "sdn", name: "Sudan", value: 17 },
  { code: "sen", name: "Senegal", value: 80 },
  { code: "sgp", name: "Singapore", value: 7909 },
  { code: "slb", name: "Solomon Islands", value: 21 },
  { code: "sle", name: "Sierra Leone", value: 102 },
  { code: "slv", name: "El Salvador", value: 306 },
  { code: "smr", name: "San Marino", value: 553 },
  { code: "som", name: "Somalia", value: 23 },
  { code: "srb", name: "Serbia", value: 81 },
  { code: "stp", name: "Sao Tome and Principe", value: 208 },
  { code: "sur", name: "Suriname", value: 4 },
  { code: "svk", name: "Slovak Republic", value: 113 },
  { code: "svn", name: "Slovenia", value: 103 },
  { code: "swe", name: "Sweden", value: 24 },
  { code: "swz", name: "Swaziland", value: 78 },
  { code: "sxm", name: "Sint Maarten (Dutch part)", value: 1177 },
  { code: "syc", name: "Seychelles", value: 206 },
  { code: "syr", name: "Syrian Arab Republic", value: 100 },
  { code: "tca", name: "Turks and Caicos Islands", value: 37 },
  { code: "tcd", name: "Chad", value: 11 },
  { code: "tgo", name: "Togo", value: 140 },
  { code: "tha", name: "Thailand", value: 135 },
  { code: "tjk", name: "Tajikistan", value: 63 },
  { code: "tkm", name: "Turkmenistan", value: 12 },
  { code: "tls", name: "Timor-Leste", value: 85 },
  { code: "ton", name: "Tonga", value: 149 },
  { code: "tto", name: "Trinidad and Tobago", value: 266 },
  { code: "tun", name: "Tunisia", value: 73 },
  { code: "tur", name: "Turkey", value: 103 },
  { code: "tuv", name: "Tuvalu", value: 370 },
  { code: "tza", name: "Tanzania", value: 63 },
  { code: "uga", name: "Uganda", value: 207 },
  { code: "ukr", name: "Ukraine", value: 78 },
  { code: "ury", name: "Uruguay", value: 20 },
  { code: "usa", name: "United States", value: 35 },
  { code: "uzb", name: "Uzbekistan", value: 75 },
  { code: "vct", name: "St. Vincent and the Grenadines", value: 281 },
  { code: "ven", name: "Venezuela RB", value: 36 },
  { code: "vgb", name: "British Virgin Islands", value: 204 },
  { code: "vir", name: "Virgin Islands (U.S.)", value: 294 },
  { code: "vnm", name: "Vietnam", value: 299 },
  { code: "vut", name: "Vanuatu", value: 22 },
  { code: "wsm", name: "Samoa", value: 69 },
  { code: "xkx", name: "Kosovo", value: 167 },
  { code: "yem", name: "Yemen Rep.", value: 52 },
  { code: "zaf", name: "South Africa", value: 46 },
  { code: "zmb", name: "Zambia", value: 22 },
  { code: "zwe", name: "Zimbabwe", value: 42 },
];

const mapChartOptions = {
  chart: {
    map: "custom/world",
    borderWidth: 1,
  },

  colors: [
    "rgba(19,64,117,0.05)",
    "rgba(19,64,117,0.2)",
    "rgba(19,64,117,0.4)",
    "rgba(19,64,117,0.5)",
    "rgba(19,64,117,0.6)",
    "rgba(19,64,117,0.8)",
    "rgba(19,64,117,1)",
  ],

  title: {
    text: "Population density by country (/km²)",
  },

  mapNavigation: {
    enabled: true,
  },

  legend: {
    title: {
      text: "Individuals per km²",
      style: {
        color:
          // theme
          (Highcharts.defaultOptions &&
            Highcharts.defaultOptions.legend &&
            Highcharts.defaultOptions.legend.title &&
            Highcharts.defaultOptions.legend.title.style &&
            Highcharts.defaultOptions.legend.title.style.color) ||
          "black",
      },
    },
    align: "left",
    verticalAlign: "bottom",
    floating: true,
    layout: "vertical",
    valueDecimals: 0,
    backgroundColor:
      // theme
      (Highcharts.defaultOptions &&
        Highcharts.defaultOptions.legend &&
        Highcharts.defaultOptions.legend.backgroundColor) ||
      "rgba(255, 255, 255, 0.85)",
    symbolRadius: 0,
    symbolHeight: 14,
  },

  colorAxis: {
    dataClasses: [
      {
        to: 3,
      },
      {
        from: 3,
        to: 10,
      },
      {
        from: 10,
        to: 30,
      },
      {
        from: 30,
        to: 100,
      },
      {
        from: 100,
        to: 300,
      },
      {
        from: 300,
        to: 1000,
      },
      {
        from: 1000,
      },
    ],
  },

  series: [
    {
      data: mapCountriesData,
      joinBy: ["iso-a3", "code"],
      animation: true,
      name: "Population density",
      states: {
        hover: {
          color: "#a4edba",
        },
      },
      tooltip: {
        valueSuffix: "/km²",
      },
      shadow: false,
    },
  ],
};

const newmapOptions = {
  chart: {
    map: "countries/ie/ie-all",
  },
  title: {
    text: "Map Demo",
  },
  credits: {
    enabled: false,
  },
  mapNavigation: {
    enabled: true,
  },
  tooltip: {
    headerFormat: "",
    pointFormat:
      "<b>{point.freq}</b><br><b>{point.keyword}</b>                      <br>lat: {point.lat}, lon: {point.lon}",
  },
  series: [
    {
      // Use the gb-all map with no data as a basemap
      name: "Basemap",
      mapData: mapDataIE,
      borderColor: "#A0A0A0",
      nullColor: "rgba(200, 200, 200, 0.3)",
      showInLegend: false,
    },
    {
      // Specify points using lat/lon
      type: "mapbubble",
      name: "Cities",
      color: "#4169E1",
      data: [
        { z: 10, keyword: "Galway", lat: 53.27, lon: -9.25 },
        { z: 4, keyword: "Dublin", lat: 53.27, lon: -6.25 },
      ],
      cursor: "pointer",
      point: {
        events: {
          click: function () {
            console.log(this.keyword);
          },
        },
      },
    },
  ],
};

const mapPopData = [
  {
    code3: "ABW",
    z: 105,
    code: "AW",
  },
  {
    code3: "AFG",
    z: 34656,
    code: "AF",
  },
  {
    code3: "AGO",
    z: 28813,
    code: "AO",
  },
  {
    code3: "ALB",
    z: 2876,
    code: "AL",
  },
  {
    code3: "AND",
    z: 77,
    code: "AD",
  },
  {
    code3: "ARE",
    z: 9270,
    code: "AE",
  },
  {
    code3: "ARG",
    z: 43847,
    code: "AR",
  },
  {
    code3: "ARM",
    z: 2925,
    code: "AM",
  },
  {
    code3: "ASM",
    z: 56,
    code: "AS",
  },
  {
    code3: "ATG",
    z: 101,
    code: "AG",
  },
  {
    code3: "AUS",
    z: 24211,
    code: "AU",
  },
  {
    code3: "AUT",
    z: 8731,
    code: "AT",
  },
  {
    code3: "AZE",
    z: 9758,
    code: "AZ",
  },
  {
    code3: "BDI",
    z: 10524,
    code: "BI",
  },
  {
    code3: "BEL",
    z: 11338,
    code: "BE",
  },
  {
    code3: "BEN",
    z: 10872,
    code: "BJ",
  },
  {
    code3: "BFA",
    z: 18646,
    code: "BF",
  },
  {
    code3: "BGD",
    z: 162952,
    code: "BD",
  },
  {
    code3: "BGR",
    z: 7128,
    code: "BG",
  },
  {
    code3: "BHR",
    z: 1425,
    code: "BH",
  },
  {
    code3: "BHS",
    z: 391,
    code: "BS",
  },
  {
    code3: "BIH",
    z: 3517,
    code: "BA",
  },
  {
    code3: "BLR",
    z: 9502,
    code: "BY",
  },
  {
    code3: "BLZ",
    z: 367,
    code: "BZ",
  },
  {
    code3: "BMU",
    z: 65,
    code: "BM",
  },
  {
    code3: "BOL",
    z: 10888,
    code: "BO",
  },
  {
    code3: "BRA",
    z: 207653,
    code: "BR",
  },
  {
    code3: "BRB",
    z: 285,
    code: "BB",
  },
  {
    code3: "BRN",
    z: 423,
    code: "BN",
  },
  {
    code3: "BTN",
    z: 798,
    code: "BT",
  },
  {
    code3: "BWA",
    z: 2250,
    code: "BW",
  },
  {
    code3: "CAF",
    z: 4595,
    code: "CF",
  },
  {
    code3: "CAN",
    z: 36265,
    code: "CA",
  },
  {
    code3: "CHE",
    z: 8372,
    code: "CH",
  },
  {
    code3: "CHL",
    z: 17910,
    code: "CL",
  },
  {
    code3: "CHN",
    z: 1378665,
    code: "CN",
  },
  {
    code3: "CIV",
    z: 23696,
    code: "CI",
  },
  {
    code3: "CMR",
    z: 23439,
    code: "CM",
  },
  {
    code3: "COD",
    z: 78736,
    code: "CD",
  },
  {
    code3: "COG",
    z: 5126,
    code: "CG",
  },
  {
    code3: "COL",
    z: 48653,
    code: "CO",
  },
  {
    code3: "COM",
    z: 796,
    code: "KM",
  },
  {
    code3: "CPV",
    z: 540,
    code: "CV",
  },
  {
    code3: "CRI",
    z: 4857,
    code: "CR",
  },
  {
    code3: "CUB",
    z: 11476,
    code: "CU",
  },
  {
    code3: "CUW",
    z: 160,
    code: "CW",
  },
  {
    code3: "CYM",
    z: 61,
    code: "KY",
  },
  {
    code3: "CYP",
    z: 1170,
    code: "CY",
  },
  {
    code3: "CZE",
    z: 10566,
    code: "CZ",
  },
  {
    code3: "DEU",
    z: 82488,
    code: "DE",
  },
  {
    code3: "DJI",
    z: 942,
    code: "DJ",
  },
  {
    code3: "DMA",
    z: 74,
    code: "DM",
  },
  {
    code3: "DNK",
    z: 5728,
    code: "DK",
  },
  {
    code3: "DOM",
    z: 10649,
    code: "DO",
  },
  {
    code3: "DZA",
    z: 40606,
    code: "DZ",
  },
  {
    code3: "ECU",
    z: 16385,
    code: "EC",
  },
  {
    code3: "EGY",
    z: 95689,
    code: "EG",
  },
  {
    code3: "ERI",
    z: 4475,
    code: "ER",
  },
  {
    code3: "ESP",
    z: 46485,
    code: "ES",
  },
  {
    code3: "EST",
    z: 1316,
    code: "EE",
  },
  {
    code3: "ETH",
    z: 102403,
    code: "ET",
  },
  {
    code3: "FIN",
    z: 5495,
    code: "FI",
  },
  {
    code3: "FJI",
    z: 899,
    code: "FJ",
  },
  {
    code3: "FRA",
    z: 66892,
    code: "FR",
  },
  {
    code3: "FRO",
    z: 49,
    code: "FO",
  },
  {
    code3: "FSM",
    z: 105,
    code: "FM",
  },
  {
    code3: "GAB",
    z: 1980,
    code: "GA",
  },
  {
    code3: "GBR",
    z: 65596,
    code: "GB",
  },
  {
    code3: "GEO",
    z: 3719,
    code: "GE",
  },
  {
    code3: "GHA",
    z: 28207,
    code: "GH",
  },
  {
    code3: "GIB",
    z: 34,
    code: "GI",
  },
  {
    code3: "GIN",
    z: 12396,
    code: "GN",
  },
  {
    code3: "GMB",
    z: 2039,
    code: "GM",
  },
  {
    code3: "GNB",
    z: 1816,
    code: "GW",
  },
  {
    code3: "GNQ",
    z: 1221,
    code: "GQ",
  },
  {
    code3: "GRC",
    z: 10771,
    code: "GR",
  },
  {
    code3: "GRD",
    z: 107,
    code: "GD",
  },
  {
    code3: "GRL",
    z: 56,
    code: "GL",
  },
  {
    code3: "GTM",
    z: 16582,
    code: "GT",
  },
  {
    code3: "GUM",
    z: 163,
    code: "GU",
  },
  {
    code3: "GUY",
    z: 773,
    code: "GY",
  },
  {
    code3: "HKG",
    z: 7337,
    code: "HK",
  },
  {
    code3: "HND",
    z: 9113,
    code: "HN",
  },
  {
    code3: "HRV",
    z: 4174,
    code: "HR",
  },
  {
    code3: "HTI",
    z: 10847,
    code: "HT",
  },
  {
    code3: "HUN",
    z: 9814,
    code: "HU",
  },
  {
    code3: "IDN",
    z: 261115,
    code: "ID",
  },
  {
    code3: "IMN",
    z: 84,
    code: "IM",
  },
  {
    code3: "IND",
    z: 1324171,
    code: "IN",
  },
  {
    code3: "IRL",
    z: 4750,
    code: "IE",
  },
  {
    code3: "IRN",
    z: 80277,
    code: "IR",
  },
  {
    code3: "IRQ",
    z: 37203,
    code: "IQ",
  },
  {
    code3: "ISL",
    z: 335,
    code: "IS",
  },
  {
    code3: "ISR",
    z: 8546,
    code: "IL",
  },
  {
    code3: "ITA",
    z: 60627,
    code: "IT",
  },
  {
    code3: "JAM",
    z: 2881,
    code: "JM",
  },
  {
    code3: "JOR",
    z: 9456,
    code: "JO",
  },
  {
    code3: "JPN",
    z: 126995,
    code: "JP",
  },
  {
    code3: "KAZ",
    z: 17794,
    code: "KZ",
  },
  {
    code3: "KEN",
    z: 48462,
    code: "KE",
  },
  {
    code3: "KGZ",
    z: 6080,
    code: "KG",
  },
  {
    code3: "KHM",
    z: 15762,
    code: "KH",
  },
  {
    code3: "KIR",
    z: 114,
    code: "KI",
  },
  {
    code3: "KNA",
    z: 55,
    code: "KN",
  },
  {
    code3: "KOR",
    z: 51246,
    code: "KR",
  },
  {
    code3: "KWT",
    z: 4053,
    code: "KW",
  },
  {
    code3: "LAO",
    z: 6758,
    code: "LA",
  },
  {
    code3: "LBN",
    z: 6007,
    code: "LB",
  },
  {
    code3: "LBR",
    z: 4614,
    code: "LR",
  },
  {
    code3: "LBY",
    z: 6293,
    code: "LY",
  },
  {
    code3: "LCA",
    z: 178,
    code: "LC",
  },
  {
    code3: "LIE",
    z: 38,
    code: "LI",
  },
  {
    code3: "LKA",
    z: 21203,
    code: "LK",
  },
  {
    code3: "LSO",
    z: 2204,
    code: "LS",
  },
  {
    code3: "LTU",
    z: 2868,
    code: "LT",
  },
  {
    code3: "LUX",
    z: 582,
    code: "LU",
  },
  {
    code3: "LVA",
    z: 1960,
    code: "LV",
  },
  {
    code3: "MAC",
    z: 612,
    code: "MO",
  },
  {
    code3: "MAF",
    z: 32,
    code: "MF",
  },
  {
    code3: "MAR",
    z: 35277,
    code: "MA",
  },
  {
    code3: "MCO",
    z: 38,
    code: "MC",
  },
  {
    code3: "MDA",
    z: 3552,
    code: "MD",
  },
  {
    code3: "MDG",
    z: 24895,
    code: "MG",
  },
  {
    code3: "MDV",
    z: 428,
    code: "MV",
  },
  {
    code3: "MEX",
    z: 127540,
    code: "MX",
  },
  {
    code3: "MHL",
    z: 53,
    code: "MH",
  },
  {
    code3: "MKD",
    z: 2081,
    code: "MK",
  },
  {
    code3: "MLI",
    z: 17995,
    code: "ML",
  },
  {
    code3: "MLT",
    z: 437,
    code: "MT",
  },
  {
    code3: "MMR",
    z: 52885,
    code: "MM",
  },
  {
    code3: "MNE",
    z: 622,
    code: "ME",
  },
  {
    code3: "MNG",
    z: 3027,
    code: "MN",
  },
  {
    code3: "MNP",
    z: 55,
    code: "MP",
  },
  {
    code3: "MOZ",
    z: 28829,
    code: "MZ",
  },
  {
    code3: "MRT",
    z: 4301,
    code: "MR",
  },
  {
    code3: "MUS",
    z: 1263,
    code: "MU",
  },
  {
    code3: "MWI",
    z: 18092,
    code: "MW",
  },
  {
    code3: "MYS",
    z: 31187,
    code: "MY",
  },
  {
    code3: "NAM",
    z: 2480,
    code: "NA",
  },
  {
    code3: "NCL",
    z: 277,
    code: "NC",
  },
  {
    code3: "NER",
    z: 20673,
    code: "NE",
  },
  {
    code3: "NGA",
    z: 185990,
    code: "NG",
  },
  {
    code3: "NIC",
    z: 6150,
    code: "NI",
  },
  {
    code3: "NLD",
    z: 17030,
    code: "NL",
  },
  {
    code3: "NOR",
    z: 5236,
    code: "NO",
  },
  {
    code3: "NPL",
    z: 28983,
    code: "NP",
  },
  {
    code3: "NRU",
    z: 13,
    code: "NR",
  },
  {
    code3: "NZL",
    z: 4693,
    code: "NZ",
  },
  {
    code3: "OMN",
    z: 4425,
    code: "OM",
  },
  {
    code3: "PAK",
    z: 193203,
    code: "PK",
  },
  {
    code3: "PAN",
    z: 4034,
    code: "PA",
  },
  {
    code3: "PER",
    z: 31774,
    code: "PE",
  },
  {
    code3: "PHL",
    z: 103320,
    code: "PH",
  },
  {
    code3: "PLW",
    z: 22,
    code: "PW",
  },
  {
    code3: "PNG",
    z: 8085,
    code: "PG",
  },
  {
    code3: "POL",
    z: 37970,
    code: "PL",
  },
  {
    code3: "PRI",
    z: 3411,
    code: "PR",
  },
  {
    code3: "PRK",
    z: 25369,
    code: "KP",
  },
  {
    code3: "PRT",
    z: 10325,
    code: "PT",
  },
  {
    code3: "PRY",
    z: 6725,
    code: "PY",
  },
  {
    code3: "PSE",
    z: 4552,
    code: "PS",
  },
  {
    code3: "PYF",
    z: 280,
    code: "PF",
  },
  {
    code3: "QAT",
    z: 2570,
    code: "QA",
  },
  {
    code3: "ROU",
    z: 19699,
    code: "RO",
  },
  {
    code3: "RUS",
    z: 144342,
    code: "RU",
  },
  {
    code3: "RWA",
    z: 11918,
    code: "RW",
  },
  {
    code3: "SAU",
    z: 32276,
    code: "SA",
  },
  {
    code3: "SDN",
    z: 39579,
    code: "SD",
  },
  {
    code3: "SEN",
    z: 15412,
    code: "SN",
  },
  {
    code3: "SGP",
    z: 5607,
    code: "SG",
  },
  {
    code3: "SLB",
    z: 599,
    code: "SB",
  },
  {
    code3: "SLE",
    z: 7396,
    code: "SL",
  },
  {
    code3: "SLV",
    z: 6345,
    code: "SV",
  },
  {
    code3: "SMR",
    z: 33,
    code: "SM",
  },
  {
    code3: "SOM",
    z: 14318,
    code: "SO",
  },
  {
    code3: "SRB",
    z: 7058,
    code: "RS",
  },
  {
    code3: "SSD",
    z: 12231,
    code: "SS",
  },
  {
    code3: "STP",
    z: 200,
    code: "ST",
  },
  {
    code3: "SUR",
    z: 558,
    code: "SR",
  },
  {
    code3: "SVK",
    z: 5431,
    code: "SK",
  },
  {
    code3: "SVN",
    z: 2065,
    code: "SI",
  },
  {
    code3: "SWE",
    z: 9923,
    code: "SE",
  },
  {
    code3: "SWZ",
    z: 1343,
    code: "SZ",
  },
  {
    code3: "SXM",
    z: 40,
    code: "SX",
  },
  {
    code3: "SYC",
    z: 95,
    code: "SC",
  },
  {
    code3: "SYR",
    z: 18430,
    code: "SY",
  },
  {
    code3: "TCA",
    z: 35,
    code: "TC",
  },
  {
    code3: "TCD",
    z: 14453,
    code: "TD",
  },
  {
    code3: "TGO",
    z: 7606,
    code: "TG",
  },
  {
    code3: "THA",
    z: 68864,
    code: "TH",
  },
  {
    code3: "TJK",
    z: 8735,
    code: "TJ",
  },
  {
    code3: "TKM",
    z: 5663,
    code: "TM",
  },
  {
    code3: "TLS",
    z: 1269,
    code: "TL",
  },
  {
    code3: "TON",
    z: 107,
    code: "TO",
  },
  {
    code3: "TTO",
    z: 1365,
    code: "TT",
  },
  {
    code3: "TUN",
    z: 11403,
    code: "TN",
  },
  {
    code3: "TUR",
    z: 79512,
    code: "TR",
  },
  {
    code3: "TUV",
    z: 11,
    code: "TV",
  },
  {
    code3: "TZA",
    z: 55572,
    code: "TZ",
  },
  {
    code3: "UGA",
    z: 41488,
    code: "UG",
  },
  {
    code3: "UKR",
    z: 45005,
    code: "UA",
  },
  {
    code3: "URY",
    z: 3444,
    code: "UY",
  },
  {
    code3: "USA",
    z: 323128,
    code: "US",
  },
  {
    code3: "UZB",
    z: 31848,
    code: "UZ",
  },
  {
    code3: "VCT",
    z: 110,
    code: "VC",
  },
  {
    code3: "VEN",
    z: 31568,
    code: "VE",
  },
  {
    code3: "VGB",
    z: 31,
    code: "VG",
  },
  {
    code3: "VIR",
    z: 108,
    code: "VI",
  },
  {
    code3: "VNM",
    z: 94569,
    code: "VN",
  },
  {
    code3: "VUT",
    z: 270,
    code: "VU",
  },
  {
    code3: "WSM",
    z: 195,
    code: "WS",
  },
  {
    code3: "YEM",
    z: 27584,
    code: "YE",
  },
  {
    code3: "ZAF",
    z: 56015,
    code: "ZA",
  },
  {
    code3: "ZMB",
    z: 16591,
    code: "ZM",
  },
  {
    code3: "ZWE",
    z: 16150,
    code: "ZW",
  },
];

const mapPopOptions = {
  chart: {
    borderWidth: 1,
    map: "custom/world",
  },

  title: {
    text: "World population 2013 by country",
  },

  subtitle: {
    text: "Demo of Highcharts map with bubbles",
  },

  legend: {
    enabled: false,
  },

  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: "bottom",
    },
  },

  series: [
    {
      name: "Countries",
      color: "#E0E0E0",
      enableMouseTracking: false,
    },
    {
      type: "mapbubble",
      name: "Population 2016",
      joinBy: ["iso-a3", "code3"],
      data: worldPopulationData,
      minSize: 4,
      maxSize: "12%",
      tooltip: {
        pointFormat: "{point.properties.hc-a2}: {point.value} thousands",
      },
    },
  ],
};

const CountriesComparatorChart = () => {
  return (
    <div>
      {/* <HighchartsReact highcharts={Highcharts} options={options} /> */}
      {/* <HighchartsReact highcharts={Highcharts} options={lineWithDataLabels} /> */}
      <HighchartsReact highcharts={Highcharts} options={stackedAreaOptions} />
      {/*  works with new map data options -> newmapOptions */}
      {/* <HighchartsReact
        constructorType={"mapChart"}
        highcharts={Highcharts}
        options={newmapOptions}
      /> */}
    </div>
  );
};

export default CountriesComparatorChart;
