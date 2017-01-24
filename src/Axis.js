// @flow
import React from 'react';
import type {Scaler, AxisStyle} from './types';

function translateX<T>(scale0: Scaler<T>, scale1: Scaler<T>, d: T) {
  const x = scale0(d);
  return `translate(${isFinite(x) ? x : scale1(d)},0)`;
}

function translateY<T>(scale0: Scaler<T>, scale1: Scaler<T>, d: T) {
  const y = scale0(d);
  return `translate(0,${isFinite(y) ? y : scale1(d)})`;
}

export const TOP = 'TOP';
export const RIGHT = 'RIGHT';
export const BOTTOM = 'BOTTOM';
export const LEFT = 'LEFT';

const defaultAxisStyle: AxisStyle = {
  orient: BOTTOM,
  tickSizeInner: 6,
  tickSizeOuter: 6,
  tickPadding: 3,
  strokeWidth: 1,
  strokeColor: 'black',
  tickFont: 'sans-serif',
  tickFontSize: 10,
};

type AxisProps<T> = {
  style: Object,
  range: Array<number>,
  values: Array<T>,
  position: Scaler<T>,
  format(d: T): string,
};

export default function Axis<T>(props: AxisProps<T>) {
  const {style, range, values, position, format} = props;

  const axisStyle = Object.assign({}, defaultAxisStyle, style);
  const {
    orient,
    tickSizeInner,
    tickPadding,
    tickSizeOuter,
    strokeWidth,
    strokeColor,
    tickFont,
    tickFontSize,
  } = axisStyle;

  const transform = orient === TOP || orient === BOTTOM
    ? translateX
    : translateY;
  const tickTransformer = d => transform(position, position, d);

  const k = orient === TOP || orient === LEFT ? -1 : 1;
  const isRight = orient === RIGHT;
  const isLeft = orient === LEFT;
  const isTop = orient === TOP;
  const isBottom = orient === BOTTOM;
  const isHorizontal = isRight || isLeft;
  const x = isHorizontal ? 'x' : 'y';
  const y = isHorizontal ? 'y' : 'x';

  const halfWidth = strokeWidth / 2;
  const range0 = range[0] + halfWidth;
  const range1 = range[range.length - 1] + halfWidth;

  const spacing = Math.max(tickSizeInner, 0) + tickPadding;

  return (
    <g
      fill={'none'}
      fontSize={tickFontSize}
      fontFamily={tickFont}
      textAnchor={isRight ? 'start' : isLeft ? 'end' : 'middle'}
      strokeWidth={strokeWidth}
    >
      <path
        stroke={strokeColor}
        d={
          isHorizontal
            ? `M${k * tickSizeOuter},${range0}H${halfWidth}V${range1}H${k *
              tickSizeOuter}`
            : `M${range0},${k * tickSizeOuter}V${halfWidth}H${range1}V${k *
              tickSizeOuter}`
        }
      />
      {values.map((v, idx) => {
        let lineProps = {stroke: strokeColor};
        lineProps[`${x}2`] = k * tickSizeInner;
        lineProps[`${y}1`] = halfWidth;
        lineProps[`${y}2`] = halfWidth;

        let textProps = {
          fill: strokeColor,
          dy: isTop ? '0em' : isBottom ? '0.71em' : '0.32em',
        };
        textProps[`${x}`] = k * spacing;
        textProps[`${y}`] = halfWidth;

        return (
          <g key={`tick-${idx}`} opacity={1} transform={tickTransformer(v)}>
            <line {...lineProps} />
            <text {...textProps}>{format(v)}</text>
          </g>
        );
      })}
    </g>
  );
}
