/** @format */

import moment from 'moment';
import {IssueTypeId} from '../../../constant/index';

export function createSVG(
  tag: string,
  attrs: {[key: string]: any}
): SVGElement {
  const elem = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.keys(attrs).forEach(attr => {
    if (attr === 'append_to') {
      const parent = attrs.append_to;
      parent.appendChild(elem);
    } else if (attr === 'innerHTML') {
      elem.innerHTML = attrs.innerHTML;
    } else {
      elem.setAttribute(attr, attrs[attr]);
    }
  });

  return elem;
}

export interface TaskDetail {
  startDate: Date;
  endDate: Date;
  detail: any;
  color: string | undefined;
  id: string;
  index: number;
}

const TypeColor = {
  [IssueTypeId.Epic]: '#FF8562',
  [IssueTypeId.SubTask]: '#C3C49B',
  [IssueTypeId.Task]: '#7C9C94',
};
export const getTasks = (tasks: any[] = []): TaskDetail[] => {
  const results: TaskDetail[] = [];
  let count = 0;
  const fn = (list: any[]) => {
    list
      .filter(item => item.isExpand === undefined || item.isExpand)
      .forEach(({startDate, endDate, children = [], type, id, ...rest}) => {
        const newStartDate = startDate && moment(startDate);
        const newEndDate = endDate && moment(endDate);
        const isInValidDate =
          startDate && endDate && moment(newStartDate).isAfter(newEndDate);
        const typeId = type.id;
        const target = {
          startDate:
            startDate &&
            moment(isInValidDate ? endDate : startDate)
              .startOf('D')
              .toDate(),
          endDate:
            endDate &&
            moment(!isInValidDate ? endDate : startDate)
              .endOf('D')
              .toDate(),
          detail: rest,
          color: TypeColor[typeId],
          id,
          index: count,
        } as TaskDetail;
        count += 1;
        results.push(target);
        fn(children);
      });
  };
  fn(tasks);
  return results;
};
