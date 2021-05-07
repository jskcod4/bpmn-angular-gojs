import { CircleMenu } from '../../circleMenu';
import { circleMenuAction } from '../../circleMenu.seeds';
import { conversionAction, eventBorderAction, conversionBoundaryAction } from '../../conversionDataSeed';
import { eventSymbolTemplate } from '../../../templates/event-node.template';
import { BpmnConfig } from '../../../common/bpmn.interface';
import { tooltiptemplate } from '../../../templates/tooltip.template';

export function eventButtonTemplate(go: any, $: any, circleMenu: CircleMenu, Type: string, config: BpmnConfig){

  let template =  $("Button", circleMenu.buttonStyleMenuCircular,
    eventSymbolTemplate(go,$, config),
    {
      toolTip: tooltiptemplate(go, $),
    }
  )

  if(Type == 'circleMenu'){
    template.setProperties(circleMenuAction(circleMenu));
  }else if(Type == 'conversion'){
    template.setProperties(conversionAction(circleMenu));
  }else if(Type == 'boundary'){
    template.setProperties(conversionBoundaryAction(circleMenu));
  }else{
    template.setProperties(eventBorderAction(circleMenu));
  }

  return template;
}
