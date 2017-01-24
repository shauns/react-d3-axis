// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Axis, {TOP, RIGHT, BOTTOM, LEFT} from '../Axis';

test('Renders bottom-oriented', () => {
  const component = renderer.create(
    <Axis
      style={{orient: BOTTOM}}
      range={[0, 1000]}
      values={[0, 250, 500]}
      position={d => d * 2}
      format={d => `${d}`}
    />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders top-oriented', () => {
  const component = renderer.create(
    <Axis
      style={{orient: TOP}}
      range={[0, 1000]}
      values={[0, 250, 500]}
      position={d => d * 2}
      format={d => `${d}`}
    />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders left-oriented', () => {
  const component = renderer.create(
    <Axis
      style={{orient: LEFT}}
      range={[0, 1000]}
      values={[0, 250, 500]}
      position={d => d * 2}
      format={d => `${d}`}
    />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders right-oriented', () => {
  const component = renderer.create(
    <Axis
      style={{orient: RIGHT}}
      range={[0, 1000]}
      values={[0, 250, 500]}
      position={d => d * 2}
      format={d => `${d}`}
    />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
