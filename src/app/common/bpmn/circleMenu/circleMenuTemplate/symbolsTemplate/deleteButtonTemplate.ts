import { CircleMenu } from '../../circleMenu';
import { tooltiptemplate } from '../../../templates/tooltip.template';

export function deleteButtonTemplate(go: any, $: any, circleMenu: CircleMenu, Type: string){

  let template =  $("Button", circleMenu.buttonStyleMenuCircular,
    { click: circleMenu.eliminarSimbolo },
    $(go.Shape, 'ThinX',
    { width: 17, height: 17, fill: 'pink', strokeWidth: 1, stroke: 'red'  }),
    {
      toolTip: tooltiptemplate(go, $),
    }
  )

  return template;
}
