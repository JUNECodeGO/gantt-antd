/** @format */

import {useState} from 'react';

import {createContainer} from 'unstated-next';
import {mockData} from 'src/mock';

const useCannt = () => {
  const [list, setList] = useState(mockData);

  const [loadKeys, setLoadKeys] = useState<string[]>([]);
  const getList = () => {
    setList([]);
  };

  return {
    getList,
    list,
    setLoadKeys,
    loadKeys,
  };
};

const TimelineContainer = createContainer(useCannt);
export default TimelineContainer;
