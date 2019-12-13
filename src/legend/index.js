import { stateColorMap } from "../constants";

export function generateLegend() {
  // create <ul>
  const list = document.createElement("ul");
  list.classList.add("legend");

  stateColorMap.forEach((range, index) => {
    // create <li>
    const legendItem = document.createElement("li");
    legendItem.classList.add("legend-item");

    // create color box
    const colorBox = document.createElement("div");
    colorBox.classList.add("legend-item-colorbox");
    colorBox.style.backgroundColor = range.color;
    legendItem.appendChild(colorBox);

    // create text inside <li>
    const legendText = getLegendItemText(range, index);
    const legendTextNode = document.createTextNode(legendText);
    legendItem.appendChild(legendTextNode);

    // add <li> to <ul>
    list.appendChild(legendItem);
  });

  // add <ul> to page
  const targetElement = document.getElementById("color-legend-target");
  targetElement.appendChild(list);
}

function getLegendItemText(range, index) {
  if (index + 1 < stateColorMap.length) {
    const nextStart = `${stateColorMap[index + 1].start}`;
    return `${range.start}-${nextStart}`;
  } else {
    return `${range.start}+`;
  }
}
