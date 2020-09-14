import React from 'react';
import cx from 'classnames';
import { linkRadial } from 'd3-shape';
import { Platform, Path } from '@vx/primitives';

import { SharedLinkProps, RadialAccessorProps, AddSVGProps } from '../../../types';
import { getX, getY, getSource, getTarget } from '../../../util/accessors';

export function pathRadialDiagonal<Link, Node>({
  source,
  target,
  angle,
  radius,
}: Required<RadialAccessorProps<Link, Node>>) {
  return (data: Link) => {
    const link = linkRadial<Link, Node>();
    link.angle(angle);
    link.radius(radius);
    link.source(source);
    link.target(target);
    return link(data);
  };
}

type LinkRadialDiagonalProps<Link, Node> = {
  angle: (node: Node) => number;
  radius: (node: Node) => number;
} & RadialAccessorProps<Link, Node> &
  SharedLinkProps<Link>;

export default function LinkRadialDiagonal<Link, Node>({
  className,
  children,
  data,
  innerRef,
  path,
  angle = getX,
  radius = getY,
  source = getSource,
  target = getTarget,
  ...restProps
}: AddSVGProps<LinkRadialDiagonalProps<Link, Node>, SVGPathElement>) {
  const pathGen = path || pathRadialDiagonal({ source, target, angle, radius });
  if (children) return <>{children({ path: pathGen })}</>;
  return (
    <Path
      ref={innerRef}
      className={Platform.OS === 'web' && cx('vx-link vx-link-radial-diagonal', className)}
      d={pathGen(data) || ''}
      {...restProps}
    />
  );
}
