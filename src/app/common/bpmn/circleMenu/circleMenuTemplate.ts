import { CircleMenu } from './circleMenu';
import { circleMenuTopTemplate } from './circleMenuTemplate/circleMenuTopTemplate';
import { circleMenuRightTemplate } from './circleMenuTemplate/circleMenuRightTemplate';
import { circleMenuBottomTemplate } from './circleMenuTemplate/circleMenuBottomTemplate';
import { BpmnConfig } from '../common/bpmn.interface';

export function circleMenuTemplate(go: any, $: any, circleMenu: CircleMenu, config: BpmnConfig): go.Adornment {
  return $(go.Adornment, "Spot",
  $(go.Panel, "Auto",
    $(go.Placeholder)),
  // OPCIONES SUPERIOR
  circleMenuTopTemplate(go, $, circleMenu, config),
  // OPCIONES LATERAL DERECHO
  circleMenuRightTemplate(go, $, circleMenu, config),
  // OPCIONES INFERIOR
  circleMenuBottomTemplate(go, $, circleMenu, config)
  );
}
