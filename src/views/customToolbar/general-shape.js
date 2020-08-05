import mxgraph from "../../graph/index";
const { mxConstants } = mxgraph;
export const generalToolbarItems = [
  {
    index: 0,
    idSeed: 1,
    id: "rectangle",
    title: "rectangle",
    class: "common rectangle",
    width: 120,
    height: 40,
    style: {
      margin_left: 10,
      shape: "rectangle",
      perimeter: 'ellipsePerimeter',
      arcSize: 20
    }
  },
  {
    index: 1,
    idSeed: 1,
    title: "triangle",
    id: "triangle",
    class: "common triangle",
    width: 120,
    height: 60,
    style: {
      margin_left: 10,
      shape: "triangle",
      direction: 'north'
    }
  },

  {
    index: 2,
    idSeed: 1,
    title: "circle",
    id: "circle",
    class: "common circle",
    width: 80,
    height: 80,
    style: {
      margin_left: 10,
      shape: "ellipse",
      perimeter: 'ellipsePerimeter',
    }
  },

  {
    index: 3,
    idSeed: 1,
    title: "rhombus",
    id: "rhombus",
    class: "common rhombus",
    width: 80,
    height: 80,
    style: {
      shape: "rhombus",
      margin_left: 10,
      perimeter: 'ellipsePerimeter',
    }
  },
  {
    index: 5,
    idSeed: 1,
    title: "cylinder",
    id: "cylinder",
    class: "common cylinder",
    width: 80,
    height: 80,
    style: {
      shape: "cylinder",
      margin_left: 10,
      perimeter: 'ellipsePerimeter',
    }
  },

  {
    index: 6,
    idSeed: 1,
    title: "actor",
    id: "actor",
    class: "common actor",
    width: 60,
    height: 60,
    style: {
      margin_left: 10,
      shape: "actor",
      perimeter: 'ellipsePerimeter',
    }
  },

  {
    index: 7,
    idSeed: 1,
    title: "cloud",
    id: "cloud",
    class: "common cloud",
    width: 80,
    height: 80,
    style: {
      margin_left: 10,
      shape: "cloud",
      perimeter: 'ellipsePerimeter',
    }
  },
  {
    index: 8,
    idSeed: 1,
    title: "hexagon",
    id: "hexagon",
    class: "common hexagon",
    width: 80,
    height: 80,
    style: {
      margin_left: 10,
      shape: "hexagon",
      perimeter: 'ellipsePerimeter',
    }
  },
  {
    index: 9,
    idSeed: 1,
    title: "doubleEllipse",
    id: "doubleEllipse",
    class: "common doubleEllipse",
    width: 80,
    height: 80,
    style: {
      shape: 'doubleEllipse',
      perimeter: 'ellipsePerimeter',
      margin_left: 10,
    }
  },

  {
    index: 10,
    idSeed: 1,
    title: "swimlane",
    id: "swimlane",
    class: "common swimlane",
    width: 120,
    height: 120,
    style: {
      shape: "swimlane",
      perimeter: 'ellipsePerimeter',
      margin_left: 10,
    }
  },

  {
    index: 11,
    idSeed: 1,
    title: "Text",
    id: "Text",
    class: "common word",
    width: 70,
    height: 20,
    style: {
      margin_left: 10,
      shape: "Text",
      strokeColor: 'transparent',
      strokeWidth: '1',
      html: 1,
      fillColor: '#FFFFFF',
      verticalAlign: mxConstants.ALIGN_MIDDLE,
      align: mxConstants.ALIGN_CENTER,
      whiteSpace: 'wrap',
      rounded: 0,
    }
  }
]

