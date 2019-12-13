import data from "./data";
import { noDataColor, stateColorMap } from "./constants";

export function getDataByState(id) {
  return data.find(state => parseInt(state.id) === parseInt(id)) || {};
}

export function getStateColor(state) {
  const stateData = getDataByState(state.id);
  const { topHeavyIndex } = stateData;

  if (stateData.billionaires === 0) return noDataColor;

  return stateColorMap.reduce((result, current) => {
    return topHeavyIndex >= current.start ? current.color : result;
  }, noDataColor);
}
