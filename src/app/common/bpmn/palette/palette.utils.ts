import { BpmnScriptConfig } from '../bpmn.config';
import { editText } from '../common/bpmn.functions';

export function getBlockText(go: any, isForPalette: boolean = true, isTextBottom: boolean = false) {
  return {
    alignment: isTextBottom ? go.Spot.Bottom: go.Spot.Center,
    alignmentFocus: isTextBottom ? go.Spot.Bottom: go.Spot.Center,
    margin: 5,
    textAlign: 'center',
    stroke: isForPalette ? BpmnScriptConfig.LabelTextColor : BpmnScriptConfig.BackgroundDark,
    editable: isForPalette ? false : true,
    doubleClick: isForPalette ? () => {} : editText,
    font: '12px sans-serif'
  }
}

export function textBlockTemplate(go: any, $: any, isForPalette: boolean = true, isTextBottom: boolean = false) {
  return $(go.Panel,'Auto', {
    alignment: isTextBottom ? go.Spot.Bottom : go.Spot.Center,
    alignmentFocus: isTextBottom ? go.Spot.Top : go.Spot.Center
  },
  $(go.TextBlock,
    getBlockText(go, false, true),
  ),
  new go.Binding('text').makeTwoWay(),
  new go.Binding('visible', 'isText'),
  new go.Binding('font', 'font'),
  )
}
