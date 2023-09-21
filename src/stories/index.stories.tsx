/** @format */

import {Button} from 'antd';
import 'antd/dist/antd.css';
import GanttAntd from './Page';

// Button.stories.ts|tsx

import type {Meta, StoryObj} from '@storybook/react';
import React from 'react';
type Story = StoryObj<typeof Button>;

const meta: Meta<typeof GanttAntd> = {
  component: GanttAntd,
};

export default meta;

export const Primary: Story = {
  render: () => <GanttAntd />,
};
