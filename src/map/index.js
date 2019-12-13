import * as d3 from "d3";
import * as topojson from "topojson-client";

import { getDataByState, getStateColor } from "../utils";
import data from "../data";

export function generateMap() {
  console.log("Merry Christmas, ya filthy animal:", data);

  const svg = d3
    .select("#map-target")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 960 600");
  const path = d3.geoPath();

  fetchMapData().then(mapData => {
    // states
    svg
      .append("g")
      .attr("class", "states")
      .selectAll("path")
      .data(topojson.feature(mapData, mapData.objects.states).features)
      .enter()
      .append("path")
      .attr("d", path)
      .on("click", handleClick)
      .style("fill", d => {
        return getStateColor(d);
      });
  });
}

const fetchMapData = async () => {
  const response = await fetch("https://d3js.org/us-10m.v1.json");
  return await response.json();
};

function handleClick(d) {
  const stateData = getDataByState(d.id);
  const { name, billionaires } = stateData;

  // create container
  const container = document.createElement("div");

  // title (state name)
  const title = document.createElement("h2");
  const titleText = document.createTextNode(name);
  title.appendChild(titleText);

  const information = generateStateInfoElement(stateData);

  container.appendChild(title);
  container.appendChild(information);

  // add container to page
  const targetElement = document.getElementById("selected-state");
  targetElement.innerHTML = "";
  targetElement.appendChild(container);
}

function generateStateInfoElement(stateData) {
  const { name, billionaires } = stateData;

  const element =
    billionaires === 0
      ? generateEmptyStateText(name)
      : generateStateInfoText(stateData);

  return element;
}

function generateEmptyStateText(name) {
  const element = document.createElement("p");
  const textNode = document.createTextNode(
    `There are no billionaires in ${name}`
  );
  element.appendChild(textNode);

  return element;
}

function generateStateInfoText(stateData) {
  const {
    name,
    billionaires,
    thousandPeopleInPoverty,
    topHeavyIndex
  } = stateData;

  const element = document.createElement("div");
  const p1 = document.createElement("p");
  const textNode1 = document.createTextNode(
    `${name} has ${billionaires} billionaire${
      billionaires > 1 ? "s" : ""
    } and around ${(
      thousandPeopleInPoverty * 1000
    ).toLocaleString()} people in poverty.`
  );
  p1.appendChild(textNode1);
  element.appendChild(p1);

  if (billionaires > 1) {
    const p2 = document.createElement("p");
    const textNode2 = document.createTextNode(
      `There are roughly ${Math.round(
        topHeavyIndex * 1000
      ).toLocaleString()} people in poverty for every billionaire in ${name}.`
    );
    p2.appendChild(textNode2);
    element.appendChild(p2);
  }
  return element;
}
