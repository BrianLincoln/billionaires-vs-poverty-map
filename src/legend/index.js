import { stateColorMap } from "../constants";

export function generateLegend() {
  // create description
  const description = document.createElement("small");
  const descriptionTextNode = document.createTextNode(
    "Top Heavy Index (see below)"
  );
  description.appendChild(descriptionTextNode);

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

  targetElement.appendChild(description);
}

function getLegendItemText(range, index) {
  // highest value
  if (index + 1 === stateColorMap.length) {
    return `${range.start}+`;
  }

  const nextStart = stateColorMap[index + 1].start - 1;

  return nextStart === range.start
    ? range.start
    : `${range.start}-${nextStart}`;
}
