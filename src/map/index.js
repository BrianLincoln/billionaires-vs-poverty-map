import * as d3 from "d3";
import * as topojson from "topojson-client";

import { getBillionaireDataByState, getStateColor } from "../utils";

export function generateMap() {
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

    // state borders
    svg
      .append("path")
      .attr("class", "state-borders")
      .attr(
        "d",
        path(
          topojson.mesh(mapData, mapData.objects.states, function(a, b) {
            return a !== b;
          })
        )
      );
  });
}

const fetchMapData = async () => {
  const response = await fetch("https://d3js.org/us-10m.v1.json");
  return await response.json();
};

function handleClick(d) {
  const label = document.getElementById("current-state");
  const { name, billionaires } = getBillionaireDataByState(d.id);

  label.innerHTML = `Billionaires in ${name}: ${
    billionaires !== undefined ? billionaires : "no data"
  }`;
}
