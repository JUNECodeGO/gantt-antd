/** @format */

import moment from 'moment';
import React, {useRef} from 'react';
import {useEffect} from 'react';
import {defaultOptions} from '../../constants';
import {createSVG, TaskDetail} from '../../utils';

const ViewModeString = ['Day', 'Week', 'Month', 'Year'];

interface Props {
  svgSize: {width: number; height: number};
  dates: React.MutableRefObject<Date[]>;
  tasks: TaskDetail[];
  dateRange: React.MutableRefObject<{
    ganttStart: Date | null;
    ganttEnd: Date | null;
  }>;
  coefficient: number;
}

const HeaderSvg = (props: Props) => {
  const svgRef = useRef<Element>();
  const layout = useRef<{date?: Element}>({});
  const {svgSize, tasks, dateRange, dates, coefficient} = props;
  const setupLayers = () => {
    layout.current.date = createSVG('g', {
      class: 'date',
      append_to: svgRef.current,
    });
  };

  const setupGanttDates = () => {
    const tempDate = {
      ganttStart: moment().startOf('d').toDate(),
      ganttEnd: moment().endOf('d').toDate(),
    };
    tasks.forEach(task => {
      const {startDate, endDate} = task;

      if (startDate && startDate < tempDate.ganttStart) {
        tempDate.ganttStart = task.startDate;
      }
      if (endDate && endDate > tempDate.ganttEnd) {
        tempDate.ganttEnd = task.endDate;
      }
    });
    if (moment(tempDate.ganttEnd).diff(moment(tempDate.ganttStart), 'd') < 20) {
      dateRange.current = {
        ganttStart: moment(tempDate.ganttStart).subtract(1, 'month').toDate(),
        ganttEnd: moment(tempDate.ganttEnd).add(1, 'month').toDate(),
      };
    } else {
      dateRange.current = {
        ganttStart: moment(tempDate.ganttStart).subtract(1, 'week').toDate(),
        ganttEnd: moment(tempDate.ganttEnd).add(1, 'week').toDate(),
      };
    }
  };

  const setupDateValues = () => {
    let cur_date = null;
    const {ganttEnd, ganttStart} = dateRange.current;

    while (cur_date === null || (ganttEnd && cur_date < ganttEnd)) {
      if (!cur_date) {
        cur_date = moment(ganttStart).toDate();
      } else {
        cur_date = moment(cur_date).add(defaultOptions.step, 'hour').toDate();
      }
      dates.current.push(cur_date);
    }
  };

  const getDateInfo = (date: Date, lastDate: Date | null, i: number) => {
    let newLastDate = lastDate;
    if (!newLastDate) {
      newLastDate = moment(date).add(1, 'year').toDate();
    }

    const date_text = {
      DayLower:
        date.getDate() !== newLastDate.getDate()
          ? moment(newLastDate).format('D')
          : '',
      WeekLower:
        date.getMonth() !== newLastDate.getMonth()
          ? moment(date).format('MM-DD')
          : moment(date).format('MM-DD'),
      MonthLower: moment(date).format('MMMM'),
      YearLower: moment(date).format('YYYY'),
      DayUpper:
        date.getMonth() !== newLastDate.getMonth()
          ? moment(date).format('MMMM')
          : '',
      WeekUpper:
        date.getMonth() !== newLastDate.getMonth()
          ? moment(date).format('MMMM')
          : '',
      MonthUpper:
        date.getFullYear() !== newLastDate.getFullYear()
          ? moment(date).format('YYYY')
          : '',
      YearUpper:
        date.getFullYear() !== newLastDate.getFullYear()
          ? moment(date).format('YYYY')
          : '',
    };

    const base_pos = {
      x: i * defaultOptions.columnWidth * coefficient,
      lower_y: defaultOptions.headerHeight,
      upper_y: defaultOptions.headerHeight - 25,
    };

    const x_pos = {
      DayLower: (defaultOptions.columnWidth * coefficient) / 2,
      DayUpper: (defaultOptions.columnWidth * coefficient * 30) / 2,
      WeekLower: 0,
      WeekUpper: (defaultOptions.columnWidth * coefficient * 4) / 2,
      MonthLower: (defaultOptions.columnWidth * coefficient) / 2,
      MonthUpper: (defaultOptions.columnWidth * coefficient * 12) / 2,
      YearLower: (defaultOptions.columnWidth * coefficient) / 2,
      YearUpper: (defaultOptions.columnWidth * coefficient * 30) / 2,
    };

    return {
      upper_text: date_text[`${ViewModeString[0]}Upper`],
      lower_text: date_text[`${ViewModeString[0]}Lower`],
      upper_x: base_pos.x + x_pos[`${ViewModeString[0]}Upper`],
      upper_y: base_pos.upper_y,
      lower_x: base_pos.x + x_pos[`${ViewModeString[0]}Lower`],
      lower_y: base_pos.lower_y,
    };
  };
  const getDatesToDraw = () => {
    let lastDate: Date | null = null;

    const tempSates = dates.current.map((date, i) => {
      const d = getDateInfo(date, lastDate, i);
      lastDate = date;
      return d;
    });
    return tempSates;
  };

  const makeDates = () => {
    getDatesToDraw().forEach(date => {
      createSVG('text', {
        x: date.lower_x,
        y: date.lower_y,
        innerHTML: date.lower_text,
        class: 'lower-text',
        append_to: layout.current.date,
      });

      if (date.upper_text) {
        const $upper_text = createSVG('text', {
          x: date.upper_x,
          y: date.upper_y,
          innerHTML: date.upper_text,
          class: 'upper-text',
          append_to: layout.current.date,
        }) as any;

        // remove out-of-bound dates
        if ($upper_text.getBBox().x2 > svgSize.width) {
          $upper_text.remove();
        }
      }
    });
  };

  useEffect(() => {
    if (svgRef.current && layout.current) {
      svgRef.current.innerHTML = '';
      layout.current = {};
      dates.current = [];
      setupGanttDates();
      setupDateValues();
      setupLayers();
      makeDates();
    }
  }, [tasks, coefficient]);

  return (
    <svg
      height={`${defaultOptions.headerHeight + 10}px`}
      width={`${svgSize.width}px`}
      ref={svgRef as React.LegacyRef<SVGSVGElement> | undefined}
    />
  );
};

export default HeaderSvg;
