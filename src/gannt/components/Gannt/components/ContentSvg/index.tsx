/** @format */

import React, {useRef} from 'react';
import {useEffect} from 'react';
import {defaultOptions} from '../../constants';
import {createSVG, TaskDetail} from '../../utils';
import Bar from '../Bar';

interface Props {
  svgSize: {width: number; height: number};
  dates: React.MutableRefObject<Date[]>;
  tasks: TaskDetail[];
  dateRange: React.MutableRefObject<{
    ganttStart: Date | null;
    ganttEnd: Date | null;
  }>;
  setSvgSize: React.Dispatch<
    React.SetStateAction<{width: number; height: number}>
  >;
  coefficient: number;
}

const defaultLayout = {
  grid: null,
  bar: null,
};

const ContentSvg = (props: Props) => {
  const {svgSize, setSvgSize, tasks, dateRange, dates, coefficient} = props;
  const svgRef = useRef<SVGElement | undefined>();
  const layout = useRef<any>(defaultLayout);

  const setupLayers = () => {
    ['grid', 'bar'].forEach(ele => {
      layout.current[ele] = createSVG('g', {
        class: ele,
        append_to: svgRef.current,
      });
    });
  };

  const makeGridBackground = () => {
    const grid_width =
      dates.current.length * defaultOptions.columnWidth * coefficient;
    const grid_height =
      (defaultOptions.barHeight + defaultOptions.padding) * tasks.length;

    setSvgSize({
      height: grid_height,
      width: grid_width,
    });
  };

  const makeGridRows = () => {
    const rows_layer = createSVG('g', {append_to: layout.current.grid});
    const lines_layer = createSVG('g', {append_to: layout.current.grid});

    const row_width =
      dates.current.length * defaultOptions.columnWidth * coefficient;
    const row_height = defaultOptions.barHeight + defaultOptions.padding;

    let row_y = 0;
    tasks.forEach(() => {
      createSVG('rect', {
        x: 0,
        y: row_y,
        width: row_width,
        height: row_height,
        class: 'grid-row',
        append_to: rows_layer,
      });

      createSVG('line', {
        x1: 0,
        y1: row_y + row_height,
        x2: row_width,
        y2: row_y + row_height,
        class: 'row-line',
        append_to: lines_layer,
      });

      row_y += defaultOptions.barHeight + defaultOptions.padding;
    });
  };

  const makeGridTicks = () => {
    let tick_x = 0;
    const tick_y = 0;
    const tick_height =
      (defaultOptions.barHeight + defaultOptions.padding) * tasks.length;
    dates.current.forEach(item => {
      let tick_class = 'tick';

      if (item.getDate() === 1) {
        tick_class += ' thick';
      }

      createSVG('path', {
        d: `M ${tick_x} ${tick_y} v ${tick_height < 1000 ? 1000 : tick_height}`,
        class: tick_class,
        append_to: layout.current.grid,
      });

      tick_x += defaultOptions.columnWidth * coefficient;
    });
  };

  const makeBars = () => {
    if (layout.current && layout.current.bar) {
      tasks.forEach(task => {
        const {startDate, endDate} = task;
        if (startDate && endDate) {
          const bar = Bar({
            task,
            dateRange,
            columnWidth: defaultOptions.columnWidth * coefficient,
          });
          layout.current.bar?.appendChild(bar.group);
        }
      });
    }
  };

  useEffect(() => {
    if (svgRef.current && layout.current) {
      svgRef.current.innerHTML = '';
      layout.current = defaultLayout;
      setupLayers();
      makeGridBackground();
      makeGridRows();
      makeGridTicks();
      makeBars();
    }
  }, [tasks, coefficient]);
  return (
    <svg
      style={{
        minHeight: 'calc(100vh - 316px)',
        width: `${svgSize.width}px`,
        height: `${svgSize.height}px`,
      }}
      ref={svgRef as React.LegacyRef<SVGSVGElement> | undefined}
    />
  );
};

export default ContentSvg;
