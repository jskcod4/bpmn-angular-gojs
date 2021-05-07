import { CircleMenu } from '../../circleMenu';
import { BpmnScriptConfig } from '../../../bpmn.config';
import { tooltiptemplate } from '../../../templates/tooltip.template';

export function div3ButtonTemplate(go: any, $: any, circleMenu: CircleMenu, Type: string){

  let template =  $("Button", circleMenu.buttonStyleMenuCircular,
    { click: circleMenu.swinDivLanes },
    $(go.Panel, "Vertical",
      $(go.Shape, 'Process',
        {
          fill: BpmnScriptConfig.LaneFill,
          width: BpmnScriptConfig.SwinTreeNodoConversionWidth, height: BpmnScriptConfig.SwinTreeNodoConversionHeight,
          stroke: BpmnScriptConfig.LaneArrowStroke
        }),
      $(go.Shape, 'Process',
        {
          fill: BpmnScriptConfig.LaneFill,
          width: BpmnScriptConfig.SwinTreeNodoConversionWidth, height: BpmnScriptConfig.SwinTreeNodoConversionHeight,
          stroke: BpmnScriptConfig.LaneArrowStroke
        }),
      $(go.Shape, 'Process',
        {
          fill: BpmnScriptConfig.LaneFill,
          width: BpmnScriptConfig.SwinTreeNodoConversionWidth, height: BpmnScriptConfig.SwinTreeNodoConversionHeight,
          stroke: BpmnScriptConfig.LaneArrowStroke
        })
    ),
    {
      toolTip: tooltiptemplate(go, $),
    }
  )

  return template;
}
