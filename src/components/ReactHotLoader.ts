import * as React from 'react';
import * as process from 'process';

// We create this wrapper so that we only import react-hot-loader for a
// development build.  Small savings. :)
const ReactHotLoader =
  DEV
  ? require('react-hot-loader').AppContainer
  : ({ children }) => React.Children.only(children);

export default ReactHotLoader;