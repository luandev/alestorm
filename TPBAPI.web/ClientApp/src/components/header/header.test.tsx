import { configure, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import Header from '.';

configure({ adapter: new Adapter() });
it('renders without crashing', () => {
  // const div = document.createElement('div');
  const result = shallow(<Header />)
  expect(result).toBeTruthy();
});
