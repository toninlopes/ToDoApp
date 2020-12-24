import React from 'react';
import {shallow} from 'enzyme';
import Task from '../../src/scenes/tasks/components/Task';

describe('Snapshot Task Component', () => {
  it('Renders Task correctly', () => {
    const component = shallow(
      <Task
        title="Title"
        isCompleted={false}
        animate
        onAnimated={() => {}}
        onDone={() => {}}
        onDelete={() => {}}
      />,
    );
    expect(component).toMatchSnapshot();
  });
});
