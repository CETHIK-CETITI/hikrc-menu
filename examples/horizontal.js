/* eslint no-console:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import { RcMenu as Menu, SubMenu, Item as MenuItem, Divider } from 'hikrc-menu';
import {menuConfig} from './const'

import animate from 'css-animation';
import 'hikrc-menu/assets/index.less';

const menuConfigObj = JSON.parse(menuConfig);

const animation = {
  enter(node, done) {
    let height;
    return animate(node, 'rc-menu-collapse', {
      start() {
        height = node.offsetHeight;
        node.style.height = 0;
      },
      active() {
        node.style.height = `${height}px`;
      },
      end() {
        node.style.height = '';
        done();
      },
    });
  },

  appear() {
    return this.enter.apply(this, arguments);
  },

  leave(node, done) {
    return animate(node, 'rc-menu-collapse', {
      start() {
        node.style.height = `${node.offsetHeight}px`;
      },
      active() {
        node.style.height = 0;
      },
      end() {
        node.style.height = '';
        done();
      },
    });
  },
};

function handleSelect(info) {
  console.log(info);
  console.log(`selected ${info.key}`);
}

function onOpenChange(value) {
  console.log('onOpenChange', value);
}


function addSubMenu(menuConfigObj, subMenuBody){
  //遍历菜单配置
  for(var key in menuConfigObj){
    //如果定义了子菜单
    if(menuConfigObj[key].subMenu){
      var tmpSubMenubody=[];
      var tmpSubMenu = <SubMenu title={<span>{menuConfigObj[key].value}</span>} key={key}>
                        {tmpSubMenubody}
                       </SubMenu>
      //递归添加
      addSubMenu(menuConfigObj[key].subMenu, tmpSubMenubody);
      subMenuBody.push(tmpSubMenu);
    }else{
      //菜单被禁止
      if(menuConfigObj[key].disabled===true){
        subMenuBody.push(<MenuItem disabled key={key}>{menuConfigObj[key].value}</MenuItem>);
      }else{
        subMenuBody.push(<MenuItem key={key}>{menuConfigObj[key].value}</MenuItem>);
      }
      console.log("add menu: 属性：" + key + ",值："+ menuConfigObj[key].value);
    }
  }
}

function render(container) {
  var menuBody=[];
  var menu=(<Menu onSelect={handleSelect} onOpenChange={onOpenChange}>
            {menuBody}
            </Menu>);

  addSubMenu(menuConfigObj.menu, menuBody);

  var config = {};
  if(menuConfigObj.config.mode) config.mode = menuConfigObj.config.mode;
  if(menuConfigObj.config.openAnimation) {
    if(menuConfigObj.config.openAnimation==="animation"){
      config.openAnimation = animation;
    }else{
      config.openAnimation = menuConfigObj.config.openAnimation;
    }
  }

  var style = {};
  if(menuConfigObj.config.style){
    if(menuConfigObj.config.style.width) style.width = menuConfigObj.config.style.width;
    if(menuConfigObj.config.style.margin) style.margin = menuConfigObj.config.style.margin;
  }



  const horizontalMenu = React.cloneElement(menu, config);

  ReactDOM.render(<div style={{ margin: 20 }}>
    <h2>水平菜单示例</h2>
    <div>
      <div style={style}>{horizontalMenu}</div>
    </div>
  </div>, container);
}

render(document.getElementById('__react-content'));
