import billionaireData from "./billionaire-data";
import { noDataColor, stateColorMap } from "./constants";

export function getBillionaireDataByState(id) {
  return billionaireData.find(state => parseInt(state.id) === parseInt(id));
}

export function getStateColor(state) {
  const stateData = getBillionaireDataByState(state.id);
  const { billionaires } = stateData;

  return stateColorMap.reduce((result, current) => {
    return billionaires >= current.start ? current.color : result;
  }, noDataColor);
}
