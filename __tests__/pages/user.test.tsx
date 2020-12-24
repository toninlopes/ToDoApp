import React from 'react';
import {shallow} from 'enzyme';
import User from '../../src/scenes/users/components/User';

describe('Snapshot User Component', () => {
  it('Renders User correctly', () => {
    const component = shallow(
      <User
        name="Name"
        username="username"
        email="email@email.com"
        onPress={() => {}}
      />,
    );
    expect(component).toMatchSnapshot();
  });
});
