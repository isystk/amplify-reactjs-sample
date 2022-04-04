import React from 'react';
import Logo from './Logo';
import {BrowserRouter} from "react-router-dom";
import renderer from 'react-test-renderer';

test('Logo', () => {
  const component = renderer.create(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>
  )
  expect(component).toMatchSnapshot()
});
