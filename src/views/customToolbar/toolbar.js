// import {
//   mxConstants as mxConstants
// } from 'mxgraph-js'
// const closeIcon = require('@/assets/icon/delete.png')

import mxgraph from "../../graph/index";
const { mxConstants } = mxgraph;
const outputIcon = './icon/output.png'
const inputIcon = './icon/input.png'
const group = './icon/group.png'
const home = './icon/home.png'
const stencil = './icon/stencil.png'
const connectPoint = './icon/connectPoint.png'

export const toolbarItems = [
  {
    id: 'output',
    idSeed: 1,
    icon: outputIcon,
    title: '输出',
    width: 70,
    height: 70,
    dropAble: false, // 是否可以作为drop的对象
    style: {
      fillColor: '#FFFFFF',
      strokeColor: '#000000',
      strokeWidth: '1',
      shape: mxConstants.SHAPE_LABEL,
      align: mxConstants.ALIGN_TOP,
      verticalAlign: mxConstants.ALIGN_BOTTOM,
      imageAlign: mxConstants.ALIGN_CENTER,
      imageVerticalAlign: mxConstants.ALIGN_TOP,
      image: outputIcon
    }
  },
  {
    id: 'input',
    idSeed: 1,
    icon: inputIcon,
    title: '输入',
    width: 70,
    height: 70,
    dropAble: false, // 是否可以作为drop的对象
    style: {
      fillColor: '#FFFFFF', // 填充色
      strokeColor: '#000000', // 线条颜色
      strokeWidth: '1', // 线条粗细
      shape: mxConstants.SHAPE_LABEL, // 形状
      align: mxConstants.ALIGN_CENTER, // 水平方向对其方式
      verticalAlign: mxConstants.ALIGN_BOTTOM, // 垂直方向对其方式
      imageAlign: mxConstants.ALIGN_CENTER, // 图形水平方向对其方式
      imageVerticalAlign: mxConstants.ALIGN_TOP, // 图形方向对其方式
      image: inputIcon // 图形
    }
  },
  {
    id: 'group',
    idSeed: 1,
    icon: group,
    title: '群组',
    width: 70,
    height: 70,
    dropAble: false, // 是否可以作为drop的对象
    style: {
      fillColor: '#FFFFFF', // 填充色
      strokeColor: '#000000', // 线条颜色
      strokeWidth: '1', // 线条粗细
      shape: mxConstants.SHAPE_LABEL, // 形状
      align: mxConstants.ALIGN_CENTER, // 水平方向对其方式
      verticalAlign: mxConstants.ALIGN_BOTTOM, // 垂直方向对其方式
      imageAlign: mxConstants.ALIGN_CENTER, // 图形水平方向对其方式
      imageVerticalAlign: mxConstants.ALIGN_TOP, // 图形方向对其方式
      image: group // 图形
    }
  },
  {
    id: 'home',
    idSeed: 1,
    icon: home,
    title: '首页',
    width: 70,
    height: 70,
    dropAble: false, // 是否可以作为drop的对象
    style: {
      fillColor: '#FFFFFF', // 填充色
      strokeColor: '#000000', // 线条颜色
      strokeWidth: '1', // 线条粗细
      shape: mxConstants.SHAPE_LABEL, // 形状
      align: mxConstants.ALIGN_CENTER, // 水平方向对其方式
      verticalAlign: mxConstants.ALIGN_BOTTOM, // 垂直方向对其方式
      imageAlign: mxConstants.ALIGN_CENTER, // 图形水平方向对其方式
      imageVerticalAlign: mxConstants.ALIGN_TOP, // 图形方向对其方式
      image: home // 图形
    }
  },
  {
    id: 'stencil',
    idSeed: 1,
    icon: stencil,
    title: '集群',
    width: 70,
    height: 70,
    dropAble: false, // 是否可以作为drop的对象
    style: {
      fillColor: '#FFFFFF', // 填充色
      strokeColor: '#000000', // 线条颜色
      strokeWidth: '1', // 线条粗细
      shape: mxConstants.SHAPE_LABEL, // 形状
      align: mxConstants.ALIGN_CENTER, // 水平方向对其方式
      verticalAlign: mxConstants.ALIGN_BOTTOM, // 垂直方向对其方式
      imageAlign: mxConstants.ALIGN_CENTER, // 图形水平方向对其方式
      imageVerticalAlign: mxConstants.ALIGN_TOP, // 图形方向对其方式
      image: stencil // 图形
    }
  },
  {
    id: 'connectPoint',
    idSeed: 1,
    icon: connectPoint,
    title: '连接',
    width: 70,
    height: 70,
    dropAble: false, // 是否可以作为drop的对象
    style: {
      fillColor: '#FFFFFF', // 填充色
      strokeColor: '#000000', // 线条颜色
      strokeWidth: '1', // 线条粗细
      shape: mxConstants.SHAPE_LABEL, // 形状
      align: mxConstants.ALIGN_CENTER, // 水平方向对其方式
      verticalAlign: mxConstants.ALIGN_BOTTOM, // 垂直方向对其方式
      imageAlign: mxConstants.ALIGN_CENTER, // 图形水平方向对其方式
      imageVerticalAlign: mxConstants.ALIGN_TOP, // 图形方向对其方式
      image: connectPoint // 图形
    }
  },
  // {
  //   title: '容器',
  //   width: 200,
  //   height: 200,
  //   dropAble: true,// 是否可以作为drop的对象
  //   style: {
  //     overflow: 'fill',
  //     shape: 'swimlane',
  //     html: '1',
  //     swimlaneFillColor: '#B1EEEE',
  //     fillColor: '#3c6379',
  //     strokeColor: '#629EA0',
  //     fontColor: '#000000'
  //   },
  //   created (graph, cell, index) {
  //     const deleteIconDom = document.querySelector(`.deleteIcon_${index}`)

  //     if (deleteIconDom) {
  //       deleteIconDom.addEventListener('click', () => {
  //         graph.removeCells([cell])
  //       })
  //     }
  //   },
  //   html: (index) => `
  //           <div style="margin: 0; padding: 0 5px; height: 100%; width: 100%; display: flex; justify-content: space-between; align-items: center; position: relative;">
  //             <span style="color: cornsilk; font-size: 20px; font-weight: 600; display: inline-block">容器</span>
  //             <img style="height: 20px; width: 20px; cursor: pointer;" class="deleteIcon_${index}" src="${closeIcon}" alt=""/>
  //           </div>
  //         `.replace(/[\r\n]/g, '')
  // }
]

// 备用的图标
export const toolbarItems2 = [
  {
    icon: outputIcon,
    title: '输出',
    width: 70,
    height: 70,
    style: {
      fillColor: '#FFFFFF',
      strokeColor: '#000000',
      strokeWidth: '1',
      shape: mxConstants.SHAPE_LABEL,
      align: mxConstants.ALIGN_CENTER,
      verticalAlign: mxConstants.ALIGN_BOTTOM,
      imageAlign: mxConstants.ALIGN_CENTER,
      imageVerticalAlign: mxConstants.ALIGN_TOP,
      image: outputIcon
    }
  },
  {
    icon: inputIcon,
    title: '输入',
    width: 70,
    height: 70,
    style: {
      fillColor: '#FFFFFF', // 填充色
      strokeColor: '#000000', // 线条颜色
      strokeWidth: '1', // 线条粗细
      shape: mxConstants.SHAPE_LABEL, // 形状
      align: mxConstants.ALIGN_CENTER, // 水平方向对其方式
      verticalAlign: mxConstants.ALIGN_BOTTOM, // 垂直方向对其方式
      imageAlign: mxConstants.ALIGN_CENTER, // 图形水平方向对其方式
      imageVerticalAlign: mxConstants.ALIGN_TOP, // 图形方向对其方式
      image: inputIcon // 图形
    }
  },
  {
    icon: group,
    title: '群组',
    width: 70,
    height: 70,
    style: {
      fillColor: '#FFFFFF', // 填充色
      strokeColor: '#000000', // 线条颜色
      strokeWidth: '1', // 线条粗细
      shape: mxConstants.SHAPE_LABEL, // 形状
      align: mxConstants.ALIGN_CENTER, // 水平方向对其方式
      verticalAlign: mxConstants.ALIGN_BOTTOM, // 垂直方向对其方式
      imageAlign: mxConstants.ALIGN_CENTER, // 图形水平方向对其方式
      imageVerticalAlign: mxConstants.ALIGN_TOP, // 图形方向对其方式
      image: group // 图形
    }
  },
  {
    icon: home,
    title: '首页',
    width: 70,
    height: 70,
    style: {
      fillColor: '#FFFFFF', // 填充色
      strokeColor: '#000000', // 线条颜色
      strokeWidth: '1', // 线条粗细
      shape: mxConstants.SHAPE_LABEL, // 形状
      align: mxConstants.ALIGN_CENTER, // 水平方向对其方式
      verticalAlign: mxConstants.ALIGN_BOTTOM, // 垂直方向对其方式
      imageAlign: mxConstants.ALIGN_CENTER, // 图形水平方向对其方式
      imageVerticalAlign: mxConstants.ALIGN_TOP, // 图形方向对其方式
      image: home // 图形
    }
  },
  {
    icon: stencil,
    title: '集群',
    width: 70,
    height: 70,
    style: {
      fillColor: '#FFFFFF', // 填充色
      strokeColor: '#000000', // 线条颜色
      strokeWidth: '1', // 线条粗细
      shape: mxConstants.SHAPE_LABEL, // 形状
      align: mxConstants.ALIGN_CENTER, // 水平方向对其方式
      verticalAlign: mxConstants.ALIGN_BOTTOM, // 垂直方向对其方式
      imageAlign: mxConstants.ALIGN_CENTER, // 图形水平方向对其方式
      imageVerticalAlign: mxConstants.ALIGN_TOP, // 图形方向对其方式
      image: stencil // 图形
    }
  },
  {
    icon: connectPoint,
    title: '连接',
    width: 70,
    height: 70,
    style: {
      fillColor: '#FFFFFF', // 填充色
      strokeColor: '#000000', // 线条颜色
      strokeWidth: '1', // 线条粗细
      shape: mxConstants.SHAPE_LABEL, // 形状
      align: mxConstants.ALIGN_CENTER, // 水平方向对其方式
      verticalAlign: mxConstants.ALIGN_BOTTOM, // 垂直方向对其方式
      imageAlign: mxConstants.ALIGN_CENTER, // 图形水平方向对其方式
      imageVerticalAlign: mxConstants.ALIGN_TOP, // 图形方向对其方式
      image: connectPoint // 图形
    }
  },
]
