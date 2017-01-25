/* eslint no-console:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import Menu, { SubMenu, Item as MenuItem, Divider } from 'hikrc-menu';
import {menuConfig} from './const'
import 'hikrc-menu/assets/index.less';

const menuConfigObj = JSON.parse(menuConfig);

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

  addSubMenu(menuConfigObj, menuBody);

  const horizontalMenu = React.cloneElement(menu, {
    mode: 'horizontal',
    // use openTransition for antd
    openAnimation: 'slide-up',
  });

  ReactDOM.render(<div style={{ margin: 20 }}>
    <h2>水平菜单示例</h2>
    <div>
      <div style={{ margin: 20, width: 800 }}>{horizontalMenu}</div>
    </div>
  </div>, container);
}

render(document.getElementById('__react-content'));
