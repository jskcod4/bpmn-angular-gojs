import { CircleMenu } from '../../circleMenu';
import { conversionAction } from '../../conversionDataSeed';
import { subProcessGroupSymbolTemplate } from '../../../templates/subprocess-group.template';
import { BpmnConfig } from '../../../common/bpmn.interface';
import { tooltiptemplate } from '../../../templates/tooltip.template';

export function subprocessButtonTemplate(go: any, $: any, circleMenu: CircleMenu, Type: string, config: BpmnConfig){

  let template =  $("Button", circleMenu.buttonStyleMenuCircular,
    subProcessGroupSymbolTemplate(go,$,config),
    {
      toolTip: tooltiptemplate(go, $),
    }
  )

  template.setProperties(conversionAction(circleMenu));

  return template;
}
