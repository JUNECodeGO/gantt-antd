/** @format */

import React, {useRef, useState, forwardRef, useEffect} from 'react';
import {Button} from 'antd';
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import ContentSvg from './components/ContentSvg';
import HeaderSvg from './components/HeaderSvg';
import {getTasks, TaskDetail} from './utils';

enum ClickType {
  Add = 'add',
  Minus = 'minus',
}

const coefficientList = [1, 0.8, 0.6];

export default forwardRef(
  (props: any, ref: React.LegacyRef<HTMLDivElement> | undefined) => {
    const {list} = props;
    const [svgSize, setSvgSize] = useState({width: 0, height: 0});
    const [allTasks, setAllTasks] = useState<TaskDetail[]>([]);
    const [delay, setDelay] = useState(false);
    const initIndex: number = 2;
    const [coefficient, setCoefficient] = useState(initIndex);

    const dates = useRef([]);

    const dateRange = useRef({
      ganttStart: null,
      ganttEnd: null,
    });

    const handleClick = (type: ClickType) => {
      if (!delay) {
        setDelay(true);
        const domRef = (ref as React.RefObject<HTMLDivElement>).current;
        const preScroll = domRef?.scrollLeft || 0;
        const oldIndex = coefficient;
        const newIndex = type === ClickType.Add ? oldIndex - 1 : oldIndex + 1;
        const newScroll =
          (preScroll * coefficientList[newIndex]) /
          coefficientList[coefficient];
        setCoefficient(newIndex);

        setTimeout(() => {
          if (newScroll) {
            domRef?.scrollTo({
              left: newScroll,
            });
          }
          setDelay(false);
        }, 800);
      }
    };

    useEffect(() => {
      dates.current = [];
      setAllTasks(getTasks(list));
    }, [list]);

    return (
      <div className='ganntContainer' ref={ref}>
        <div className='actionContainer'>
          <Button
            icon={<PlusOutlined />}
            size='small'
            disabled={coefficient === 0 || delay}
            onClick={() => handleClick(ClickType.Add)}
          />
          <Button
            icon={<MinusOutlined />}
            size='small'
            disabled={coefficient === 2 || delay}
            onClick={() => handleClick(ClickType.Minus)}
          />
        </div>
        <div className='header'>
          <HeaderSvg
            coefficient={coefficientList[coefficient]}
            svgSize={svgSize}
            dates={dates}
            tasks={allTasks}
            dateRange={dateRange}
          />
        </div>
        <ContentSvg
          coefficient={coefficientList[coefficient]}
          dates={dates}
          svgSize={svgSize}
          setSvgSize={setSvgSize}
          tasks={allTasks}
          dateRange={dateRange}
        />
      </div>
    );
  }
);
