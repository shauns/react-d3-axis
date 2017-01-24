# react-d3-axis

[![Build Status](https://travis-ci.org/shauns/react-d3-axis.svg?branch=master)](https://travis-ci.org/shauns/react-d3-axis)

React-based Axis component for D3

<img src="http://i.imgur.com/lfNZ6RN.png" width="300">

## What is this?

D3v4's modular structure means you can pull in things like the scaling or colour logic, and leave out DOM functionality if you're using D3 in an environment that 'owns' the DOM -- such as React.

This is a port of the [d3-axis](https://github.com/d3/d3-axis) module into a React component and helper functions.

## Examples

```js
import {Axis, axisPropsFromTickScale, LEFT} from 'react-d3-axis';
import {scaleLinear} from 'd3-scale';

const scale = scaleLinear().domain([0, 100]).range([0, 500]);
<Axis {...axisPropsFromTickScale(scale, 10)} style={{orient: LEFT}}/>
```
## API

### &lt;Axis />

Renders an Axis in SVG (so it expects to be within an `svg` element).

##### values: Array&lt;T>

The values corresponding to where the ticks on the axis will be made.

##### position: (d: T) => number

A function converting a tick value to an offset along the axis.

##### format: (d: T) => string

A function rendering a tick value to a string, for its label.

##### range: Array&lt;number>

The numerical range of the *rendered* axis. So, if an axis runs 1000px wide, this would be `[0, 1000]`.

##### style: AxisStyle

This is optional -- by default the axis is rendered with 'bottom' alignment (left-to-right, ticks below the line).

### axisPropsFromTickScale(scale, tickCount)

Creates props for an `<Axis />` component from a tick-based D3 scale, such as `scaleLinear`.

### axisPropsFromBandedScale(scale)

Creates props for an `<Axis />` component from a banded D3 scale, such as `scaleBand`.
