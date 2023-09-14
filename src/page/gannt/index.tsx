/** @format */

import {Spin} from 'antd';
import React, {useRef} from 'react';
import {useEffect} from 'react';
import Filter from './components/Filter';
import Gannt from './components/Gannt';
import GanntTable from './components/GanntTable';
import {mockData} from '../../mock/index';
import './index.css';

const GanntPage = () => {
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
            list={mockData}
          />
          <Gannt
            ref={rightRef as React.RefObject<HTMLDivElement>}
            list={mockData}
          />
        </div>
      </Spin>
    </div>
  );
};

export default GanntPage;
