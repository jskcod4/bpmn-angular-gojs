import { CircleMenu } from "../../circleMenu";
import { circleMenuAction } from "../../circleMenu.seeds";
import { conversionAction } from "../../conversionDataSeed";
import { annotationSymbolTemplate } from "../../../templates/annotation.template";
import { BpmnConfig } from "../../../common/bpmn.interface";
import { tooltiptemplate } from "../../../templates/tooltip.template";

export function annotationButtonTemplate(
  go: any,
  $: any,
  circleMenu: CircleMenu,
  Type: string,
  config: BpmnConfig
) {
  let template = $(
    "Button",
    circleMenu.buttonStyleMenuCircular,
    annotationSymbolTemplate(go, $, config),
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
