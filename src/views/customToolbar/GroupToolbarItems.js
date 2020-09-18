// const closeIcon = 'data:image/png;base64,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';
import mxgraph from '../../graph/index';

const { mxConstants } = mxgraph;
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
      verticalAlign: mxConstants.ALIGN_TOP,
      align: mxConstants.ALIGN_CENTER,
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
      verticalAlign: mxConstants.ALIGN_TOP,
      align: mxConstants.ALIGN_CENTER,
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
      verticalAlign: mxConstants.ALIGN_TOP,
      align: mxConstants.ALIGN_CENTER,
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
      verticalAlign: mxConstants.ALIGN_TOP,
      align: mxConstants.ALIGN_CENTER,
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
      verticalAlign: mxConstants.ALIGN_TOP,
      align: mxConstants.ALIGN_CENTER,
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
      verticalAlign: mxConstants.ALIGN_TOP,
      align: mxConstants.ALIGN_CENTER,
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
      verticalAlign: mxConstants.ALIGN_TOP,
      align: mxConstants.ALIGN_CENTER,
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
