import { CircleMenu } from '../../circleMenu';
import { BpmnConfig } from '../../../common/bpmn.interface';
import { tooltiptemplate } from '../../../templates/tooltip.template';

export function eventoBordeButtonTemplate(go: any, $: any, circleMenu: CircleMenu, Type: string, config: BpmnConfig){

  let template =  $("Button", circleMenu.buttonStyleMenuCircular,
    $(go.Shape,
      {
        geometryString: config.ShapeEventoBorder1,
        stroke: config.EventBorderCircleStroke,
        width: 20, height: 20,
      }),
    $(go.Shape,
      {
        geometryString: config.ShapeEventoBorder2,
        stroke: config.EventBorderLineStroke,
        width: 10, height: 10,
      }),
    {
      click: (e,obj) => circleMenu.setEventBorderSimbol(obj),
      toolTip: tooltiptemplate(go, $),
    }
  )

  return template;
}
