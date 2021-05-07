import { BpmnEventBus } from 'src/app/common/data/bpmn.class';
import { BpmnEventType, GatewayType } from '../../common/bpmn.enum';
import { nodeGatewaySymbolTypeConverter } from '../../common/bpmn.functions';
import { getBlockText } from '../../palette/palette.utils';
import { BpmnConfig } from '../../common/bpmn.interface';
import { tooltiptemplate } from '../tooltip.template';

export function gatewayNodeTemplateForPalette(go: any, $: any, bpmnEventBus: BpmnEventBus, config: BpmnConfig) {
  return $(go.Node, 'Vertical',
    {
      resizable: false,
      locationObjectName: 'SHAPE',
      locationSpot: go.Spot.Center,
      toolTip: tooltiptemplate(go, $),
      resizeObjectName: 'SHAPE',
      desiredSize: new go.Size(70, 70),
      mouseHover: (diagram, element) => {
        if (bpmnEventBus) {
          bpmnEventBus.emit(BpmnEventType.paletteMouseHover, {
            diagram,
            element
          });
        }
      },
      mouseLeave: (diagram, element) => {
        if (bpmnEventBus) {
          bpmnEventBus.emit(BpmnEventType.paletteMouseLeave, {
            diagram,
            element
          });
        }
      }
    },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    $(go.Panel, 'Spot',
      $(go.Shape, 'Diamond',
      {
        strokeWidth: 1,
        fill: config.GatewayNodeFill,
        stroke: config.GatewayNodeStroke,
        name: 'SHAPE',
        desiredSize: new go.Size(config.GatewayNodeSize / 2, config.GatewayNodeSize / 2),
        portId: '',
        fromLinkable: true,
        toLinkable: true,
        cursor: 'pointer',
        fromSpot: go.Spot.NotLeftSide,
        toSpot: go.Spot.NotRightSide
      },
      new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify)),
      $(go.Shape, 'NotAllowed',
        {
          alignment: go.Spot.Center,
          stroke: config.GatewayNodeSymbolStroke
        },
        new go.Binding('figure', 'gatewayType', nodeGatewaySymbolTypeConverter),
        new go.Binding('fill', 'gatewayType', s => {
          if (+s === GatewayType.inclusive || +s === GatewayType.eventBasedGateway || +s == GatewayType.eventBasedStart) {
            return config.GatewayNodeFill;
          }
          return config.GatewayNodeSymbolFill
        }),
        new go.Binding('strokeWidth', 'gatewayType', s => {
          if (
            +s === GatewayType.complex || +s === GatewayType.parallel ||
            +s === GatewayType.inclusive || +s === GatewayType.eventBasedGateway ||
            +s === GatewayType.eventBasedStart || +s === GatewayType.parallelEvent) {
            return 2;
          } else {
            return 0;
          }
        }),
        new go.Binding('desiredSize', 'gatewayType', s => {
          const size = new go.Size(config.GatewayNodeSymbolSize / 2, config.GatewayNodeSymbolSize / 2);
          if (+s === GatewayType.parallel) {
            size.width = size.width / 4 * 3;
            size.height = size.height / 4 * 3;
          }
          if (+s === GatewayType.exclusive) {
            size.width = size.width / 4 * 3;
            size.height = size.height / 4 * 3;
          }
          if (+s > 4) {
            size.width = size.width / 1.6;
            size.height = size.height / 1.6;
          }
          return size;
        }),
        new go.Binding('visible', 'gatewayType', s => {
          return +s !== GatewayType.general;
        })
      ),
      $(go.Shape, 'Circle',
        {
          strokeWidth: 1,
          stroke: config.GatewayNodeSymbolStroke,
          fill: null,
          desiredSize: new go.Size(config.EventNodeSize / 1.6, config.EventNodeSize / 1.6)
        },
        new go.Binding('visible', 'gatewayType', s => {
          return +s >= 5;
        })
      ),
      $(go.Shape, 'Circle',
        {
          alignment: go.Spot.Center,
          stroke: config.GatewayNodeSymbolStroke,
          desiredSize: new go.Size(config.EventNodeInnerSize / 1.8, config.EventNodeInnerSize / 1.8),
          fill: null
        },
        new go.Binding('strokeWidth', 'gatewayType', s => {
          if (+s === GatewayType.eventBasedGateway) {
            return 1;
          }
          return 0;
        }),
        new go.Binding('visible', 'gatewayType', s => {
          if (+s === GatewayType.eventBasedGateway) {
            return true;
          }
          return false;
        })
      )
    ),
    $(go.TextBlock,
      {
        ...getBlockText(go),
        overflow: go.TextBlock.OverflowEllipsis,
        maxLines: 1
      },
      new go.Binding('text')
    )
  );

}
