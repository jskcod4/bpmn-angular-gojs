import { CircleMenu } from "../circleMenu";
import { BpmnScriptConfig } from "../../bpmn.config";
import { subprocessButtonTemplate } from "../circleMenuTemplate/symbolsTemplate/subprocessButtonTemplate";
import { BpmnConfig } from "../../common/bpmn.interface";

export function subprocessTemplete(
  go: any,
  $: any,
  circleMenu: CircleMenu,
  config: BpmnConfig
): go.Adornment {
  const palNodeTemplateMap = new go.Map();
  palNodeTemplateMap.add(
    "subprocess",
    subprocessButtonTemplate(go, $, circleMenu, "conversion", config)
  );

  return $(
    go.Adornment,
    "Spot",
    {
      background: "transparent",
      mouseLeave: function (e, obj) {
        var ad: any = obj.part;
        ad.adornedPart.removeAdornment("contentConversion");
      },
    },
    $(go.Panel, "Auto", $(go.Placeholder)),
    $(
      go.Panel,
      "Horizontal",
      {
        defaultStretch: go.GraphObject.Vertical,
        alignment: go.Spot.Bottom,
        alignmentFocus: go.Spot.Top,
        padding: 5,
      },
      $(
        go.Panel,
        "Auto",
        $(go.Shape, "RoundedRectangle", {
          fill: BpmnScriptConfig.NodeConversionFill,
          stroke: BpmnScriptConfig.NodeConversionStroke,
          strokeWidth: BpmnScriptConfig.NodeConversionStrokeWidth,
        }),
        $(go.Panel, "Horizontal", {
          defaultStretch: go.GraphObject.Vertical,
          alignment: go.Spot.Bottom,
          alignmentFocus: go.Spot.Top,
          padding: 5,
          itemArray: circleMenu.subprocessDataButton,
          itemTemplateMap: palNodeTemplateMap,
        })
      )
    )
  );
}
