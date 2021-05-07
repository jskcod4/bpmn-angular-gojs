import { CircleMenu } from '../circleMenu'
import { topSymbols } from '../circleMenu.seeds';
import { BpmnConfig } from '../../common/bpmn.interface';

export function circleMenuTopTemplate(go: any, $: any, circleMenu: CircleMenu, config: BpmnConfig) {

  const palNodeTemplateMap = new go.Map();
  topSymbols.templates.forEach(item => {
    palNodeTemplateMap.add(item.key, item.function(go, $, circleMenu, 'circleMenu', config));
  })

  let data = circleMenu.setAdornmentCircleMenu(topSymbols.dataArray,circleMenu.myDiagram.selection.first().data);

  let template =
    $(go.Panel, "Horizontal",
        { defaultStretch: go.GraphObject.Vertical ,alignment: go.Spot.Top, alignmentFocus: go.Spot.Bottom, 
          itemArray: data,
          itemTemplateMap: palNodeTemplateMap
        }
      );
  return template;
};
