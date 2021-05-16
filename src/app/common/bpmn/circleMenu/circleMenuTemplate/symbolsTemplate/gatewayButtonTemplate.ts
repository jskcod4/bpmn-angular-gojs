import { CircleMenu } from "../../circleMenu";
import { gatewaySymbolTemplate } from "../../../templates/gateway-node.template";
import { conversionAction } from "../../conversionDataSeed";
import { BpmnConfig } from "../../../common/bpmn.interface";
import { tooltiptemplate } from "../../../templates/tooltip.template";
import { circleMenuAction } from "../../circleMenu.seeds";

export function gatewayButtonTemplate(
  go: any,
  $: any,
  circleMenu: CircleMenu,
  Type: string,
  config: BpmnConfig
) {
  let template = $(
    "Button",
    circleMenu.buttonStyleMenuCircular,
    gatewaySymbolTemplate(go, $, config),
    {
      toolTip: tooltiptemplate(go, $),
    }
  );

  if (Type == "circleMenu") {
    template.setProperties(circleMenuAction(circleMenu));
  } else {
    template.setProperties(conversionAction(circleMenu));
  }

  return template;
}
