import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Tooltip } from 'antd';
import IMAGE_SHAPES from './shape-config/image-shape';

import './sidebar.less';

const { Panel } = Collapse;

const SIDEBAR_BASIC_SHAPES = [
  {
    name: 'rectangle',
    key: 'Rectangle',
    logo: 'https://img.alicdn.com/tfs/TB19O8OokvoK1RjSZFNXXcxMVXa-33-26.svg',
    width: 120,
    height: 60,
  },
  {
    name: 'rounded rectangle',
    key: 'Rounded Rectangle',
    logo: 'https://img.alicdn.com/tfs/TB1rzVHojDpK1RjSZFrXXa78VXa-33-26.svg',
    width: 120,
    height: 60,
  },
  {
    name: 'trapezoid',
    key: 'Trapezoid',
    logo: 'https://img.alicdn.com/tfs/TB1nEXPokvoK1RjSZPfXXXPKFXa-33-26.svg',
    width: 120,
    height: 60,
  },
  {
    name: 'circle',
    key: 'Circle',
    logo: 'https://img.alicdn.com/tfs/TB15iXQogHqK1RjSZFkXXX.WFXa-38-38.svg',
    width: 80,
    height: 80,
  },
  {
    name: 'triangle',
    key: 'Triangle',
    logo: 'https://img.alicdn.com/tfs/TB1cxNKohTpK1RjSZR0XXbEwXXa-38-38.svg',
    width: 80,
    height: 80,
  },
  {
    name: 'line',
    key: 'Line',
    logo: 'https://img.alicdn.com/tfs/TB1LOxPoirpK1RjSZFhXXXSdXXa-38-38.svg',
    width: 80,
    height: 80,
  },
  {
    name: 'text',
    key: 'Text',
    logo: '',
    width: 60,
    height: 20,
  }
];

const SIDEBAR_SVG_SHAPES = [{
  name: 'on-grid energy',
  key: 'shangwangdianliang',
  logo: 'https://img.alicdn.com/tfs/TB1i4I1wxTpK1RjSZR0XXbEwXXa-80-80.svg',
  width: 80,
  height: 80,
},
{
  name: 'electricity earnings',
  key: 'fadianshouyi',
  logo: 'https://img.alicdn.com/tfs/TB1MVA2wr2pK1RjSZFsXXaNlXXa-80-80.svg',
  width: 80,
  height: 80,
},
{
  name: 'monitor',
  key: 'gaojingjianshi',
  logo: 'https://img.alicdn.com/tfs/TB1DildwNYaK1RjSZFnXXa80pXa-80-80.svg',
  width: 80,
  height: 80,
}];

const SIDEBAR_CARD_SHAPES = [{
  name: 'primary equipment',
  key: 'zhushebei',
  logo: 'https://img.alicdn.com/tfs/TB1eD9LdgHqK1RjSZJnXXbNLpXa-144-128.png',
  width: 100,
  height: 80
}, {
  name: 'auxiliary equipment',
  key: 'fujiashebei',
  logo: 'https://img.alicdn.com/tfs/TB1ejUeiAPoK1RjSZKbXXX1IXXa-36-32.png',
  width: 100,
  height: 80
}, {
  name: 'product element',
  key: 'chanchuwu',
  logo: 'https://img.alicdn.com/tfs/TB1ht.aisbpK1RjSZFyXXX_qFXa-32-32.png',
  width: 100,
  height: 80
}];

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate() {
    this.handleSidebarItems();
  }

  handleSidebarItems() {
    const { editor } = this.props;

    if (editor && editor.initSidebar) {
      const sidebarItems = document.querySelectorAll('.custom-sidebar-node');

      const newSidebarItems = Array.from(sidebarItems).filter((item) => {
        if (!item.classList.contains('has-inited')) {
          item.classList.add('has-inited');
          return true;
        }
        return false;
      });

      editor.initSidebar(newSidebarItems);
    }
  }

  onChange() {
    setTimeout(() => {
      this.handleSidebarItems();
    }, 1000);
  }

  render() {
    return (
      <div className="J_Sidebar_Container sidebar-container">

        <Collapse
          bordered={false}
          defaultActiveKey={['common', 'svg', 'picture', 'card']}
          onChange={() => {
            this.onChange();
          }}
        >
          <Panel key="common" header="basic">

            {SIDEBAR_BASIC_SHAPES.map(shape => (
              <a
                href="javascript:void(0);"
                key={`panel_a_${shape.key}`}
                className="geItem custom-sidebar-node common-panel-node"
                data-shape-type="general"
                data-shape-name={shape.key}
                data-shape-label={shape.name}
                data-shape-width={shape.width}
                data-shape-height={shape.height}
              >
                <Tooltip
                  placement="top"
                  title={shape.name}
                  key={`panel_${shape.key}`}
                  className="tooltip"
                >
                  {shape.logo ? <img className="sidebar-node-image" src={shape.logo} alt="" /> : shape.key}
                  <span className="sidebar-node-label">
                    {shape.name}
                  </span>
                </Tooltip>
              </a>
            ))}

          </Panel>

          <Panel header="svg shapes" key="svg">
            {SIDEBAR_SVG_SHAPES.map(shape => (
              <a
                href="javascript:void(0);"
                key={`panel_a_${shape.key}`}
                className="geItem custom-sidebar-node common-panel-node"
                data-shape-type="svg"
                data-shape-name={shape.key}
                data-shape-label={shape.name}
                data-shape-width={shape.width}
                data-shape-height={shape.height}
              >
                <Tooltip
                  placement="top"
                  title={shape.name}
                  key={`panel_${shape.key}`}
                  className="tooltip"
                >
                  <img className="sidebar-node-image" src={shape.logo} alt="" />
                  <span className="sidebar-node-label">
                    {shape.name}
                  </span>
                </Tooltip>
              </a>
            ))}
          </Panel>
          <Panel header="images" key="picture">
            {IMAGE_SHAPES.map(shape => (
              <a
                onClick={(e) => {
                  e.preventDefault();
                  return false;
                }}
                key={`panel_a_${shape.key}`}
                href="a"
                className="geItem custom-sidebar-node"
                data-shape-type="image"
                data-shape-width={shape.width}
                data-shape-height={shape.height}
                data-shape-name={shape.key}
                data-shape-label={shape.name}
                title={shape.name}
              >
                <Tooltip
                  placement="top"
                  title={shape.name}
                  key={`panel_${shape.key}`}
                  className="tooltip"
                >
                  <img className="sidebar-node-image" src={shape.logo} alt="" />
                  <span className="sidebar-node-label">
                    {shape.name}
                  </span>
                </Tooltip>

              </a>
            ))}

          </Panel>

          <Panel header="cards" key="card">
            {SIDEBAR_CARD_SHAPES.map(shape => (
              <a
                onClick={(e) => {
                  e.preventDefault();
                  return false;
                }}
                key={`panel_a_${shape.key}`}
                href="a"
                className="geItem custom-sidebar-node"
                data-shape-type="card"
                data-shape-width={shape.width}
                data-shape-height={shape.height}
                data-shape-name={shape.key}
                data-shape-label={shape.name}
                title={shape.name}
              >
                <Tooltip
                  placement="top"
                  title={shape.name}
                  key={`panel_${shape.key}`}
                  className="tooltip"
                >
                  <img className="sidebar-node-image" src={shape.logo} alt="" />
                  <span className="sidebar-node-label">
                    {shape.name}
                  </span>
                </Tooltip>

              </a>
            ))}

          </Panel>

        </Collapse>

      </div>
    );
  }
}

SideBar.propTypes = {
  editor: PropTypes.object,
};

// Specifies the default values for props:
SideBar.defaultProps = {
  editor: {},
};
