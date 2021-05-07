import { CircleMenu } from '../circleMenu';
import { bottomSymbols } from '../circleMenu.seeds';
import { BpmnConfig } from '../../common/bpmn.interface';

export function circleMenuBottomTemplate(go: any, $: any, circleMenu: CircleMenu, config: BpmnConfig) {

  const palNodeTemplateMap = new go.Map();
  bottomSymbols.templates.forEach(item => {
    palNodeTemplateMap.add(item.key, item.function(go, $, circleMenu, 'circleMenu', config));
  })

  let data = circleMenu.setAdornmentCircleMenu(bottomSymbols.dataArray,circleMenu.myDiagram.selection.first().data);

  let template = $(go.Panel, "Horizontal",
    { defaultStretch: go.GraphObject.Vertical ,alignment: go.Spot.Bottom, alignmentFocus: go.Spot.Top, 
      itemArray: data,
      itemTemplateMap: palNodeTemplateMap
    },
  );

  return template;
}
