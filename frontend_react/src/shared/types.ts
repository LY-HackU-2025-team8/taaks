export type ComponentPropsWithoutChildren<
  T extends
    | keyof React.JSX.IntrinsicElements
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | React.JSXElementConstructor<any>,
> = Omit<React.ComponentProps<T>, 'children'>;
