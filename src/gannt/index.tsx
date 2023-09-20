/** @format */

import {Spin} from 'antd';
import React, {useRef} from 'react';
import {useEffect} from 'react';
import Filter from './components/Filter';
import Gannt from './components/Gannt';
import GanntTable from './components/GanntTable';

import './index.css';

export interface Cols {
  value: string;
  title: string;
  span: number;
}

export interface Props {
  data: any[];
  cols: Cols[];
  renderLabel: (title: string, data: any) => any;
}
const GanntPage = (props: Props) => {
  const {data, cols, renderLabel} = props;
  const leftRef = useRef<HTMLElement>();
  const rightRef = useRef<HTMLElement>();

  const scrollLock = useRef({
    isRightScroll: false,
    isLeftScroll: false,
  });
  useEffect(() => {
    rightRef.current?.addEventListener('scroll', function (e: any) {
      if (!scrollLock.current.isLeftScroll) {
        scrollLock.current = {
          ...scrollLock.current,
          isRightScroll: true,
        };
        leftRef.current?.scroll({
          top: e.target?.scrollTop,
        });
      }
      scrollLock.current = {
        ...scrollLock.current,
        isLeftScroll: false,
      };
    });
    leftRef.current?.addEventListener('scroll', function (e: any) {
      if (!scrollLock.current.isRightScroll) {
        scrollLock.current = {
          ...scrollLock.current,
          isLeftScroll: true,
        };
        rightRef.current?.scroll({
          top: e.target?.scrollTop,
        });
      }
      scrollLock.current = {
        ...scrollLock.current,
        isRightScroll: false,
      };
    });
  }, []);

  return (
    <div className='jiraTimeline'>
      <Spin spinning={false}>
        <Filter />
        <div className='content'>
          <GanntTable
            ref={leftRef as React.RefObject<HTMLDivElement>}
            rightRef={rightRef}
            list={data}
            cols={cols}
            renderLabel={renderLabel}
          />
          <Gannt
            ref={rightRef as React.RefObject<HTMLDivElement>}
            list={data}
          />
        </div>
      </Spin>
    </div>
  );
};

export default GanntPage;
