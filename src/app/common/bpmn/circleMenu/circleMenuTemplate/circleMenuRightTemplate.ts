import { CircleMenu } from "../circleMenu";
import { rightSymbols } from "../circleMenu.seeds";
import { BpmnConfig } from "../../common/bpmn.interface";

export function circleMenuRightTemplate(
  go: any,
  $: any,
  circleMenu: CircleMenu,
  config: BpmnConfig
) {
  const palNodeTemplateMap = new go.Map();
  rightSymbols.templates.forEach((item) => {
    palNodeTemplateMap.add(
      item.key,
      item.function(go, $, circleMenu, "circleMenu", config)
    );
  });

  let data = circleMenu.setAdornmentCircleMenu(
    rightSymbols.dataArray,
    circleMenu.myDiagram.selection.first().data
  );

  let template = $(go.Panel, "Vertical", {
    defaultStretch: go.GraphObject.Vertical,
    alignment: go.Spot.Right,
    alignmentFocus: go.Spot.Left,
    itemArray: data,
    itemTemplateMap: palNodeTemplateMap,
  });

  return template;
}
