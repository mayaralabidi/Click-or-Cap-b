/// <reference types="react-scripts" />

declare module 'react-simple-maps' {
  export const ComposableMap: any;
  export const Geographies: any;
  export const Geography: any;
}

declare module 'd3-scale' {
  export function scaleLinear<T>(): any;
}
