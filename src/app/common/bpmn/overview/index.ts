export class BpmnOverview {
  public static getOverview(go: any, $: any, diagram:  go.Diagram): go.Overview {
    return $(go.Overview, 'myOverviewDiv', {
      observed: diagram,
      maxScale: 5,
      contentAlignment: go.Spot.Center
    });
  }
}
