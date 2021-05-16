import { CircleMenu } from "../../circleMenu";
import { BpmnScriptConfig } from "../../../bpmn.config";
import { tooltiptemplate } from "../../../templates/tooltip.template";

export function laneUpButtonTemplate(
  go: any,
  $: any,
  circleMenu: CircleMenu,
  Type: string
) {
  let template = $(
    "Button",
    circleMenu.buttonStyleMenuCircular,
    { click: circleMenu.addLane },
    $(go.Shape, "Rectangle", {
      fill: BpmnScriptConfig.LaneFill,
      stroke: BpmnScriptConfig.LaneArrowStroke,
      width: BpmnScriptConfig.LaneNodoConversionWidth,
      height: BpmnScriptConfig.LaneNodoConversionHeight,
    }),
    $(go.Shape, {
      geometryString: BpmnScriptConfig.ShapeArrowUP,
      stroke: BpmnScriptConfig.LaneArrowStroke,
      width: 10,
      height: 15,
    }),
    {
      toolTip: tooltiptemplate(go, $),
    }
  );

  return template;
}
