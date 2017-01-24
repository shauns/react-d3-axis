// @flow
import type {TickScale, PropsForAxis} from './types';

export default function axisPropsFromTickScale<T>(
  scale: TickScale<T>,
  tickCount: number,
): PropsForAxis<T> {
  const range = scale.range();
  const values = scale.ticks(tickCount);
  const format = scale.tickFormat(tickCount);

  const position = scale.copy();

  return {range, values, format, position};
}
