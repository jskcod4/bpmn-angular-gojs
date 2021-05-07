import { CircleMenu } from '../../circleMenu';
import { BpmnScriptConfig } from '../../../bpmn.config';
import { tooltiptemplate } from '../../../templates/tooltip.template';

export function conexionButtonTemplate(go: any, $: any, circleMenu: CircleMenu, Type: string){

  let template =  $("Button", circleMenu.buttonStyleMenuCircular,
    { click: circleMenu.drawLink, actionMove: circleMenu.drawLink },
    $(go.Shape,
        { geometryString: BpmnScriptConfig.ShapeConexion }),
    {
      toolTip: tooltiptemplate(go, $),
    }
  )

  return template;
}
