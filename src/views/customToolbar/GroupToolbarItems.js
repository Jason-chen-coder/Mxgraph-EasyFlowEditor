import { MxConstants } from '../../graph/index';

// const { MxConstants } = mxgraph;
export const grouptoolItems = [
  {
    title: '分组1',
    id: 'group-1',
    width: 400,
    height: 800,
    dropAble: true,
    style: {
      overflow: 'fill',
      shape: 'swimlane',
      html: '1',
      swimlaneFillColor: '#FFFF',
      fillColor: '#409eff',
      strokeColor: '#629EA0',
      fontColor: '#000000',
      verticalAlign: MxConstants.ALIGN_TOP,
      align: MxConstants.ALIGN_CENTER,
    },
    created (graph, cell, index) {
      const deleteIconDom = document.querySelector(`.deleteIcon_${index}`);
      if (deleteIconDom) {
        deleteIconDom.addEventListener('click', () => {
          graph.removeCells([cell]);
        });
      }
    },
    html: (index) => `
            <div style="margin: 0; height: 100%; width: 100%;display: flex; align-items: center; position: relative;">
              <span style="color: cornsilk; font-size: 20px; font-weight: 600; display: inline-block;position: absolute;left: 50%;transform: translateX(-50%)">分组1</span>
              <i style="height: 20px; width: 20px;font-size: 20px;color: #ffffff; cursor: pointer;position: absolute;right: 10px" class="deleteIcon_${index} el-icon-delete-solid"></i>
            </div>
          `.replace(/[\r\n]/g, ''),
  },
  {
    title: '分组2',
    id: 'group-2',
    width: 400,
    height: 800,
    dropAble: true,
    style: {
      overflow: 'fill',
      shape: 'swimlane',
      html: '1',
      swimlaneFillColor: '#FFFF',
      fillColor: '#409eff',
      strokeColor: '#629EA0',
      fontColor: '#000000',
      verticalAlign: MxConstants.ALIGN_TOP,
      align: MxConstants.ALIGN_CENTER,
    },
    created (graph, cell, index) {
      const deleteIconDom = document.querySelector(`.deleteIcon_${index}`);
      if (deleteIconDom) {
        deleteIconDom.addEventListener('click', () => {
          graph.removeCells([cell]);
        });
      }
    },
    html: (index) => `
            <div style="margin: 0; height: 100%; width: 100%;display: flex; align-items: center; position: relative;">
              <span style="color: cornsilk; font-size: 20px; font-weight: 600; display: inline-block;position: absolute;left: 50%;transform: translateX(-50%)">分组2</span>
              <i style="height: 20px; width: 20px;font-size: 20px;color: #ffffff; cursor: pointer;position: absolute;right: 10px" class="deleteIcon_${index} el-icon-delete-solid"></i>
            </div>
          `.replace(/[\r\n]/g, ''),
  },
  {
    title: '分组3',
    id: 'group-3',
    width: 400,
    height: 800,
    dropAble: true,
    style: {
      overflow: 'fill',
      shape: 'swimlane',
      html: '1',
      swimlaneFillColor: '#FFFF',
      fillColor: '#409eff',
      strokeColor: '#629EA0',
      fontColor: '#000000',
      verticalAlign: MxConstants.ALIGN_TOP,
      align: MxConstants.ALIGN_CENTER,
    },
    created (graph, cell, index) {
      const deleteIconDom = document.querySelector(`.deleteIcon_${index}`);
      if (deleteIconDom) {
        deleteIconDom.addEventListener('click', () => {
          graph.removeCells([cell]);
        });
      }
    },
    html: (index) => `
            <div style="margin: 0; height: 100%; width: 100%;display: flex; align-items: center; position: relative;">
              <span style="color: cornsilk; font-size: 20px; font-weight: 600; display: inline-block;position: absolute;left: 50%;transform: translateX(-50%)">分组3</span>
              <i style="height: 20px; width: 20px;font-size: 20px;color: #ffffff; cursor: pointer;position: absolute;right: 10px" class="deleteIcon_${index} el-icon-delete-solid"></i>
            </div>
          `.replace(/[\r\n]/g, ''),
  },
  {
    title: '分组4',
    id: 'group-4',
    width: 400,
    height: 800,
    dropAble: true,
    style: {
      overflow: 'fill',
      shape: 'swimlane',
      html: '1',
      swimlaneFillColor: '#FFFF',
      fillColor: '#409eff',
      strokeColor: '#629EA0',
      fontColor: '#000000',
      verticalAlign: MxConstants.ALIGN_TOP,
      align: MxConstants.ALIGN_CENTER,
    },
    created (graph, cell, index) {
      const deleteIconDom = document.querySelector(`.deleteIcon_${index}`);
      if (deleteIconDom) {
        deleteIconDom.addEventListener('click', () => {
          graph.removeCells([cell]);
        });
      }
    },
    html: (index) => `
            <div style="margin: 0; height: 100%; width: 100%;display: flex; align-items: center; position: relative;">
              <span style="color: cornsilk; font-size: 20px; font-weight: 600; display: inline-block;position: absolute;left: 50%;transform: translateX(-50%)">分组4</span>
              <i style="height: 20px; width: 20px;font-size: 20px;color: #ffffff; cursor: pointer;position: absolute;right: 10px" class="deleteIcon_${index} el-icon-delete-solid"></i>
            </div>
          `.replace(/[\r\n]/g, ''),
  },
  {
    title: '分组5',
    id: 'group-5',
    width: 400,
    height: 800,
    dropAble: true,
    style: {
      overflow: 'fill',
      shape: 'swimlane',
      html: '1',
      swimlaneFillColor: '#FFFF',
      fillColor: '#409eff',
      strokeColor: '#629EA0',
      fontColor: '#000000',
      verticalAlign: MxConstants.ALIGN_TOP,
      align: MxConstants.ALIGN_CENTER,
    },
    created (graph, cell, index) {
      const deleteIconDom = document.querySelector(`.deleteIcon_${index}`);
      if (deleteIconDom) {
        deleteIconDom.addEventListener('click', () => {
          graph.removeCells([cell]);
        });
      }
    },
    html: (index) => `
            <div style="margin: 0; height: 100%; width: 100%;display: flex; align-items: center; position: relative;">
              <span style="color: cornsilk; font-size: 20px; font-weight: 600; display: inline-block;position: absolute;left: 50%;transform: translateX(-50%)">分组5</span>
              <i style="height: 20px; width: 20px;font-size: 20px;color: #ffffff; cursor: pointer;position: absolute;right: 10px" class="deleteIcon_${index} el-icon-delete-solid"></i>
            </div>
          `.replace(/[\r\n]/g, ''),
  },
  {
    title: '分组6',
    id: 'group-6',
    width: 400,
    height: 800,
    dropAble: true,
    style: {
      overflow: 'fill',
      shape: 'swimlane',
      html: '1',
      swimlaneFillColor: '#FFFF',
      fillColor: '#409eff',
      strokeColor: '#629EA0',
      fontColor: '#000000',
      verticalAlign: MxConstants.ALIGN_TOP,
      align: MxConstants.ALIGN_CENTER,
    },
    created (graph, cell, index) {
      const deleteIconDom = document.querySelector(`.deleteIcon_${index}`);
      if (deleteIconDom) {
        deleteIconDom.addEventListener('click', () => {
          graph.removeCells([cell]);
        });
      }
    },
    html: (index) => `
            <div style="margin: 0; height: 100%; width: 100%;display: flex; align-items: center; position: relative;">
              <span style="color: cornsilk; font-size: 20px; font-weight: 600; display: inline-block;position: absolute;left: 50%;transform: translateX(-50%)">分组6</span>
              <i style="height: 20px; width: 20px;font-size: 20px;color: #ffffff; cursor: pointer;position: absolute;right: 10px" class="deleteIcon_${index} el-icon-delete-solid"></i>
            </div>
          `.replace(/[\r\n]/g, ''),
  },
  {
    title: '分组7',
    id: 'group-7',
    width: 400,
    height: 800,
    dropAble: true,
    style: {
      overflow: 'fill',
      shape: 'swimlane',
      html: '1',
      swimlaneFillColor: '#FFFF',
      fillColor: '#409eff',
      strokeColor: '#629EA0',
      fontColor: '#000000',
      verticalAlign: MxConstants.ALIGN_TOP,
      align: MxConstants.ALIGN_CENTER,
    },
    created (graph, cell, index) {
      const deleteIconDom = document.querySelector(`.deleteIcon_${index}`);
      if (deleteIconDom) {
        deleteIconDom.addEventListener('click', () => {
          graph.removeCells([cell]);
        });
      }
    },
    html: (index) => `
            <div style="margin: 0; height: 100%; width: 100%;display: flex; align-items: center; position: relative;">
              <span style="color: cornsilk; font-size: 20px; font-weight: 600; display: inline-block;position: absolute;left: 50%;transform: translateX(-50%)">分组7</span>
              <i style="height: 20px; width: 20px;font-size: 20px;color: #ffffff; cursor: pointer;position: absolute;right: 10px" class="deleteIcon_${index} el-icon-delete-solid"></i>
            </div>
          `.replace(/[\r\n]/g, ''),
  },
  {
    title: '子元素-1', // 显示名称
    id: 'member-1',
    width: 130, // 默认宽度
    height: 50, // 默认高度
    dropAble: false, // 是否可以作为drop的对象
    style: { // 样式
      html: '1',
      fillColor: '#409eff',
      strokeColor: '#53859F',
      fontColor: '#000000',
    },
    html: () => `
                 <div style="margin: 0; padding: 0 5px; height: 100%; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 1.2rem; color: cornsilk; font-weight: 600;">子元素</span>
                 </div>
                `.replace(/[\r\n]/g, ''),
  },
];
