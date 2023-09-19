/** @format */

import {Row, Col} from 'antd';

import {cols} from '../../constants';

import './index.css';

const TreeHeader = () => {
  return (
    <Row
      className={'header'}
      style={{paddingLeft: '72px'}}
      align='middle'
      gutter={12}>
      {cols.map(({value, title, ...rest}) => (
        <Col key={value} {...rest} className={value}>
          {title}
        </Col>
      ))}
    </Row>
  );
};
export default TreeHeader;
