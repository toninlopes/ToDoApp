import React from 'react';
import {shallow} from 'enzyme';
import SaveTask from '../../src/scenes/saveTask/SaveTask';

const props = {
  route: {
    params: {
      user: {
        id: 0,
        name: 'Name',
      },
    },
  },
};

describe('Snapshot User Page', () => {
  it('Renders User correctly', () => {
    const component = shallow(<SaveTask {...props} />);
    expect(component).toMatchSnapshot();
  });
});
