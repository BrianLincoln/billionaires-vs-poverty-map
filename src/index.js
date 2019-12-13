import * as d3 from "d3";
import * as topojson from "topojson-client";

import { getBillionaireDataByState, getStateColor } from "./utils";

const getMapData = async () => {
  const response = await fetch("https://d3js.org/us-10m.v1.json");
  return await response.json();
};

var svg = d3
  .select("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 960 600");
var path = d3.geoPath();

getMapData().then(us => {
  svg
    .append("g")
    .attr("class", "states")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter()
    .append("path")
    .attr("d", path)
    .on("click", handleClick)
    .style("fill", d => {
      return getStateColor(d);
    });
  svg
    .append("path")
    .attr("class", "state-borders")
    .attr(
      "d",
      path(
        topojson.mesh(us, us.objects.states, function(a, b) {
          return a !== b;
        })
      )
    );
});

function handleClick(d) {
  const label = document.getElementById("current-state");
  const { name, billionaires } = getBillionaireDataByState(d.id);

  label.innerHTML = `Billionaires in ${name}: ${
    billionaires !== undefined ? billionaires : "no data"
  }`;
}
