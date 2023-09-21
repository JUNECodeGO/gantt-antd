/** @format */

import React, {useState} from 'react';
import GanttAntd from '../index';
const cols = [
  {
    value: 'type',
    title: 'Type',
    span: 1.5,
  },
  {
    value: 'key',
    title: 'key',
    span: 4,
  },
  {
    value: 'summary',
    title: 'Summary',
    span: 7,
  },
  {
    value: 'startDate',
    title: 'Start Date',
    span: 4,
  },
  {
    value: 'endDate',
    title: 'End Date',
    span: 4,
  },
  {
    value: 'status',
    title: 'Status',
    span: 3,
  },
];

// export default () => {
// const [state, setState] = useState<any[]>([
//   {
//     type: 'type',
//     key: 'key',
//     summary: 'summary',
//     startDate: +new Date(),
//     endDate: +new Date(),
//     status: 'status',
//   },
// ]);

//   return (
//     <>
//       <GanttAntd data={state} cols={cols} />
//     </>
//   );
// };

export default () => (
  <div>
    {' '}
    <GanttAntd
      data={[
        {
          type: 'type',
          key: 'key',
          summary: 'summary',
          startDate: +new Date(),
          endDate: +new Date(),
          status: 'status',
          children: [
            {
              type: 'type',
              key: 'key',
              summary: 'summary',
              startDate: +new Date(),
              endDate: +new Date(),
              status: 'status',
            },
          ],
        },
      ]}
      cols={cols}
    />
  </div>
);
