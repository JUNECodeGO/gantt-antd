/** @format */

import React, {forwardRef, Key, LegacyRef} from 'react';
import {Avatar, Col, Empty, Row, Tree} from 'antd';
import TreeHeader from './components/TreeHeader';
import {TreeNodeNormal} from 'antd/lib/tree/Tree';
import {cols} from './constants';
import './index.css';

const renderLabel = (title: string, data: any) => {
  switch (title) {
    case 'status':
      return data.name;
    case 'type':
      return (
        <span>
          <Avatar
            src={data.iconUrl}
            size={14}
            shape='square'
            style={{marginRight: '4px'}}
          />
        </span>
      );
    case 'key':
      return (
        <a
          target='_blank'
          onClick={() => {
            window.open(`https://www.baidu.com/browse/${data}`, '_blank');
          }}>
          {data}
        </a>
      );

    default:
      return data;
  }
};

const getTreeData = (event: any[]) => {
  const result: TreeNodeNormal[] = [];
  const fn = (
    list: any[],
    parentId: number | string,
    target: TreeNodeNormal[],
    count: number
  ) => {
    list.forEach(item => {
      const sCount = count < 0 ? 0 : count - 1;
      const children: TreeNodeNormal[] = [];
      const task = {
        title: (
          <Row
            align='middle'
            style={{paddingLeft: `${sCount * 24}px`}}
            gutter={{xs: 8, sm: 12}}>
            {cols.map(({value, title, ...rest}) => (
              <Col
                key={title}
                {...rest}
                style={{
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}>
                {renderLabel(value, item[value])}
              </Col>
            ))}
          </Row>
        ),
        isLeaf: false,
        key: `${item.id}_${parentId}_${item.type.id}`,
        children,
      };
      target.push(task);
      if (item.children) fn(item.children, item.id, children, sCount);
    });
  };
  fn(event, 0, result, 3);
  return result;
};

export default forwardRef(
  (
    props: {
      rightRef: React.MutableRefObject<HTMLElement | undefined>;
      list: any;
    },
    ref: LegacyRef<HTMLDivElement> | undefined
  ) => {
    const {list} = props;
    const data = getTreeData(list);
    const onLoadData = async ({key}: any) => {
      return Promise.resolve();
    };

    const handleExpand = (expandedKeys: Key[]) => {
      // const ids: string[] = expandedKeys.map(
      //   item => (typeof item === 'string' && item.split('_')[0]) || ''
      // );
    };

    const handleSelect = (selectedKeys: Key[]) => {
      const id = selectedKeys && (selectedKeys[0] as string)?.split('_')[0];
      const targetBar = document.querySelector(`g[data-id="${id}"]`);
      const dom = (ref as React.RefObject<HTMLElement>).current;

      if (targetBar && dom) {
        const x = targetBar.getBoundingClientRect().left;
        const parentX = dom.getBoundingClientRect().right;
        const preScroll = props.rightRef.current?.scrollLeft || 0;
        const diff = x - parentX;
        props.rightRef.current?.scrollTo({
          left: preScroll + diff,
          behavior: 'smooth',
        });
      }
    };

    return (
      <div className='left' ref={ref}>
        <TreeHeader />
        <div className='resize' style={{width: '800px'}}></div>
        <div className='treeContainer'>
          {data.length ? (
            <Tree
              treeData={data}
              loadData={onLoadData}
              onExpand={handleExpand}
              onSelect={handleSelect}
              autoExpandParent={false}
            />
          ) : (
            <Empty style={{marginTop: '50px'}} />
          )}
        </div>
      </div>
    );
  }
);
