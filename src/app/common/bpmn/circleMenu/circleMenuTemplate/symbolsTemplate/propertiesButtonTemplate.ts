import { CircleMenu } from '../../circleMenu';
import { tooltiptemplate } from '../../../templates/tooltip.template';

export function propertiesButtonTemplate(go: any, $: any, circleMenu: CircleMenu, Type: string){

  let template =  $("Button", circleMenu.buttonStyleMenuCircular,
    { click: circleMenu.openPropiedades },
    $(go.Shape, 'BpmnTaskService',
      { width: 20, height: 20, fill: "lightgrey", strokeWidth: 1, stroke: 'grey'  }),
    {
      toolTip: tooltiptemplate(go, $),
    }
  )

  return template;
}
