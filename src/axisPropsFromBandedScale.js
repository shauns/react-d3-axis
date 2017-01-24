// @flow
import type {BandedScale, PropsForAxis} from './types';

export default function axisPropsFromBandedScale<T>(
  scale: BandedScale<T>,
): PropsForAxis<T> {
  const range = scale.range();
  const values = scale.domain();
  const format = (d: T) => String(d);

  let offset = scale.bandwidth() / 2;
  const scaleCopy = scale.copy();
  if (scaleCopy.round()) offset = Math.round(offset);
  const position = (d: T) => scaleCopy(d) + offset;

  return {range, values, format, position};
}
