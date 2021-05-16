import { CircleMenu } from "../../circleMenu";
import { tooltiptemplate } from "../../../templates/tooltip.template";

export function conversionButtonTemplate(
  go: any,
  $: any,
  circleMenu: CircleMenu,
  Type: string
) {
  let template = $(
    "Button",
    circleMenu.buttonStyleMenuCircular,
    $(
      go.Shape,
      "BpmnActivityLoop",
      { fill: "grey", strokeWidth: 1, stroke: "grey" },
      new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(
        go.Size.stringify
      )
    ),
    {
      click: (e, obj) => circleMenu.setConversionSimbol(e, obj, $),
      toolTip: tooltiptemplate(go, $),
    }
  );

  return template;
}
