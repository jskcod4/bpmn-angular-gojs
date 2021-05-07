export function tooltiptemplate(go: any, $: any) {
  return $('ToolTip', {
      visible: false
    },
    new go.Binding('visible', 'tooltip', s => {
      return s.length > 0;
    }),
    $(go.TextBlock,
      {
        margin: 3
      },
      new go.Binding('text', 'tooltip')
    )
  );
}
