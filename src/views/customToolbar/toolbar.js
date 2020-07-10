// import {
//   mxConstants as mxConstants
// } from 'mxgraph-js'
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
    icon: outputIcon,
    title: '输出',
    width: 50,
    height: 50,
    style: {
      fillColor: 'transparent',
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
    width: 50,
    height: 50,
    style: {
      fillColor: 'transparent', // 填充色
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
    width: 50,
    height: 50,
    style: {
      fillColor: 'transparent', // 填充色
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
    width: 50,
    height: 50,
    style: {
      fillColor: 'transparent', // 填充色
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
    width: 50,
    height: 50,
    style: {
      fillColor: 'transparent', // 填充色
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
    width: 50,
    height: 50,
    style: {
      fillColor: 'transparent', // 填充色
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

// 备用的图标
export const toolbarItems2 = [
  {
    icon: outputIcon,
    title: '输出',
    width: 50,
    height: 50,
    style: {
      fillColor: 'transparent',
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
    width: 50,
    height: 50,
    style: {
      fillColor: 'transparent', // 填充色
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
    width: 50,
    height: 50,
    style: {
      fillColor: 'transparent', // 填充色
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
    width: 50,
    height: 50,
    style: {
      fillColor: 'transparent', // 填充色
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
    width: 50,
    height: 50,
    style: {
      fillColor: 'transparent', // 填充色
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
    width: 50,
    height: 50,
    style: {
      fillColor: 'transparent', // 填充色
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
