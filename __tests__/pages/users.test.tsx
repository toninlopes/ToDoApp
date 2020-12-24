import React from 'react';
import {shallow} from 'enzyme';
import Users from '../../src/scenes/users/Users';

describe('Snapshot Users Page', () => {
  it('Renders Users correctly', () => {
    const component = shallow(<Users />);
    expect(component).toMatchSnapshot();
  });
});
