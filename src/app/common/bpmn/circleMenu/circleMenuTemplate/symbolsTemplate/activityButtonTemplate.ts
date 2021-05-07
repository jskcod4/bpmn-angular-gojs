import { CircleMenu } from '../../circleMenu';
import { circleMenuAction } from '../../circleMenu.seeds';
import { activitySymbolTemplate } from '../../../templates/activity.template';
import { conversionAction } from '../../conversionDataSeed';
import { BpmnConfig } from '../../../common/bpmn.interface';
import { getBlockText } from '../../../palette/palette.utils';
import { tooltiptemplate } from '../../../templates/tooltip.template';

export function activityButtonTemplate(go: any, $: any, circleMenu: CircleMenu, Type: string, config: BpmnConfig){

  let template =  $("Button", circleMenu.buttonStyleMenuCircular,
    activitySymbolTemplate(go,$,config),
    {
      toolTip: tooltiptemplate(go, $),
    }
  )

  if(Type == 'circleMenu'){
    template.setProperties(circleMenuAction(circleMenu));
  }else{
    template.setProperties(conversionAction(circleMenu));
  }

  return template;
}
