// @flow
import {scaleLinear} from 'd3-scale';
import axisPropsFromTickScale from '../axisPropsFromTickScale';

test('Creates axis props', () => {
  const scale = scaleLinear().domain([0, 100]).range([0, 500]);
  const props = axisPropsFromTickScale(scale, 10);
  expect(props).toMatchSnapshot();

  expect(props.format(50)).toEqual('50');
  expect(props.position(50)).toEqual(250);
});
