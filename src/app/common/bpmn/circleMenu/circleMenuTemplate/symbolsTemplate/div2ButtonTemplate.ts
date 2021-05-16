import { CircleMenu } from "../../circleMenu";
import { BpmnScriptConfig } from "../../../bpmn.config";
import { tooltiptemplate } from "../../../templates/tooltip.template";

export function div2ButtonTemplate(go: any, $: any, circleMenu: CircleMenu) {
  let template = $(
    "Button",
    circleMenu.buttonStyleMenuCircular,
    { click: circleMenu.swinDivLanes },
    $(
      go.Panel,
      "Vertical",
      $(go.Shape, "Process", {
        fill: BpmnScriptConfig.LaneFill,
        width: BpmnScriptConfig.SwinTwoNodoConversionWidth,
        height: BpmnScriptConfig.SwinTwoNodoConversionHeight,
        stroke: BpmnScriptConfig.LaneArrowStroke,
      }),
      $(go.Shape, "Process", {
        fill: BpmnScriptConfig.LaneFill,
        width: BpmnScriptConfig.SwinTwoNodoConversionWidth,
        height: BpmnScriptConfig.SwinTwoNodoConversionHeight,
        stroke: BpmnScriptConfig.LaneArrowStroke,
      })
    ),
    {
      toolTip: tooltiptemplate(go, $),
    }
  );

  return template;
}
