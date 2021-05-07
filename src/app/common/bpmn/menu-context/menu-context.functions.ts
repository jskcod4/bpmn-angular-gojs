import { PaletteCategory } from "../palette/palette.enum";

export function setDefaultProperties(obj: go.GraphObject, diagram: go.Diagram, tool: go.Tool, cxElement: HTMLElement) {
  const mousePt = diagram.lastInput.viewPoint;
  const contextMenuWidth = +getComputedStyle(document.documentElement).getPropertyValue('--bpmn-context-menu-width').replace('px', '');
  const contextMenuHeight = 500;
  const element = document.getElementsByTagName('bpmn-context-menu');
  const { clientWidth, clientHeight } = (<any>diagram).Ia;
  cxElement.style.left = mousePt.x + 'px';
  cxElement.style.top = mousePt.y + 'px';
  cxElement.style.transform = getPositionContextMenu(clientHeight, clientWidth, contextMenuWidth, contextMenuHeight, mousePt, element);
  cxElement.style.display = 'block';
  element.item(0).setAttribute('hidden', 'FALSE');
  if (obj) {
    let { category, eventDimension } = (<any>obj).jb;
    if (!category) category = PaletteCategory.link;
    const subCategory = eventDimension;
    restartCategory(element);
    restartByInclude(element);
    showByInclude(category, element);
    showCategory(category, subCategory, element);
    return;
  } else {
    restartCategory(element);
    restartByInclude(element);
    showByInclude(PaletteCategory.diagram, element);
    showCategory(PaletteCategory.diagram, null, element);
  }
}

function getPositionContextMenu(clientHeight, clientWidth, contextMenuWidth, contextMenuHeight, mousePt, element) {
  const valueX = (mousePt.x + contextMenuWidth) > clientWidth ? '-44%' : '55%';
  const valueY = (mousePt.y + contextMenuHeight) > clientHeight ? '-100%' : '0';
  if ((mousePt.x + (2 * contextMenuWidth)) > clientWidth) {
    element.item(0).setAttribute('to-left', 'TRUE');
  }
  if ((mousePt.y + contextMenuHeight) > clientHeight) {
    element.item(0).setAttribute('to-top', 'TRUE');
  }
  return `translate(${valueX}, ${valueY})`;
}

export function showCategory(category: PaletteCategory, subCategory: any, elements: HTMLCollectionOf<Element>) {
  for (let index = 0; index < elements.length; index++) {
    const contextMenu = elements.item(index);
    const { length } = contextMenu.children;
    for (let i = 0; i < length; i++) {
      const categoryElement = contextMenu.children.item(i);
      if (!categoryElement.attributes.getNamedItem('category')) {
        break;
      }
      const categoryPalette = <PaletteCategory>categoryElement.attributes.getNamedItem('category').value;
      const subCategoryPalette = <string>categoryElement.attributes.getNamedItem('subcategory').value;
      if (category === categoryPalette) {
        if (subCategory) {
          if (+subCategory === +subCategoryPalette) {
            contextMenu.children.item(i).setAttribute('forced', 'TRUE');
          }
        } else {
          contextMenu.children.item(i).setAttribute('forced', 'TRUE');
        }
      }
      if (categoryElement.children.length > 1) {
        showCategory(category, subCategory, categoryElement.children);
      }
    }
  }
}

export function restartCategory(elements: HTMLCollectionOf<Element>) {
  for (let index = 0; index < elements.length; index++) {
    const contextMenu = elements.item(index);
    const length = contextMenu.children.length;
    for (let index = 0; index < length; index++) {
      const categoryElement = contextMenu.children.item(index);
      contextMenu.children.item(index).setAttribute('forced', 'FALSE');
      if (categoryElement.children.length > 1) {
        restartCategory(categoryElement.children);
      }
    }
  }
}

export function showByInclude(category: PaletteCategory, elements: HTMLCollectionOf<Element>) {
  for (let index = 0; index < elements.length; index++) {
    const contextMenu = elements.item(index);
    const { length } = contextMenu.children;
    for (let index = 0; index < length; index++) {
      const categoryElement = contextMenu.children.item(index);
      if (!categoryElement.attributes.getNamedItem('includeFor')) {
        break;
      }
      const categoryPalette = categoryElement.attributes.getNamedItem('includeFor').value;
      if (categoryPalette.match(new RegExp(category))) {
        contextMenu.children.item(index).setAttribute('forced', 'TRUE');
      }
      if (categoryElement.children.length > 1) {
        showByInclude(category, categoryElement.children);
      }
    }
  }
}

export function restartByInclude(elements: HTMLCollectionOf<Element>) {
  for (let index = 0; index < elements.length; index++) {
    const contextMenu = elements.item(index);
    const { length } = contextMenu.children;
    for (let index = 0; index < length; index++) {
      contextMenu.children.item(index).setAttribute('forced', 'FALSE');
    }
  }
}
