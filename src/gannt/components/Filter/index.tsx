/** @format */

import React from 'react';
import {Button, Input, Form, DatePicker, Col, Row, Tabs} from 'antd';
import 'antd/es/input/style/index.less';
import 'antd/es/input/style/mixin.less';
import 'antd/es/button/style/index.less';
import 'antd/es/form/style/index.less';
import 'antd/es/date-picker/style/index.less';
import 'antd/es/tabs/style/index.less';

const groupStyle = {
  display: 'flex',
  alignItems: 'flex-start',
};

const HeaderFilter = () => {
  return (
    <div className='gannt-header'>
      <Tabs
        tabBarExtraContent={
          <div className='button-container'>
            <Button type='primary'>Search</Button>
            <Button>Reset</Button>
          </div>
        }>
        <Tabs.TabPane tab='Multiple' key='1'>
          <Row gutter={[12, 12]} justify='start'>
            <Col style={{height: '44px'}} span={5}>
              <Input />
            </Col>
            <Col style={{height: '44px'}} span={5}>
              <Input.Group compact style={groupStyle}>
                <span className={'selectAddon'}>Start Date</span>
                <Form.Item name='startDate' noStyle>
                  <DatePicker.RangePicker style={{width: '100%'}} />
                </Form.Item>
              </Input.Group>
            </Col>
            <Col style={{height: '44px'}} span={5}>
              <Input.Group compact style={groupStyle}>
                <span className={'selectAddon'}>Due Date</span>
                <Form.Item name='dueDate' noStyle>
                  <DatePicker.RangePicker style={{width: '100%'}} />
                </Form.Item>
              </Input.Group>
            </Col>
            <Col style={{height: '44px'}} span={5}>
              <Input.Group compact style={groupStyle}>
                <span className={'selectAddon'}>CreateTime</span>
                <Form.Item name='createTime' noStyle>
                  <DatePicker.RangePicker style={{width: '100%'}} />
                </Form.Item>
              </Input.Group>
            </Col>
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Filter Key' key='2'>
          <Row>
            <Col style={{height: '44px'}} span={5}>
              <Input.Group compact style={groupStyle}>
                <span className={'selectAddon'}>Filter ID</span>
                <Form.Item name='filterId' noStyle>
                  <Input />
                </Form.Item>
              </Input.Group>
            </Col>
          </Row>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default HeaderFilter;
