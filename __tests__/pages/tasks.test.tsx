import React from 'react';
import {shallow} from 'enzyme';
import Tasks from '../../src/scenes/tasks/Tasks';

const props = {
  route: {
    params: {
      user: {
        name: 'Name',
      },
    },
  },
};

describe('Snapshot Tasks Page', () => {
  it('Renders Tasks correctly', () => {
    const component = shallow(<Tasks {...props} />);
    expect(component).toMatchSnapshot();
  });
});
