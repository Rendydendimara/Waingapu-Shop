// Loading box component

import React from 'react';

const LoadingBox = (props) => (
  <div className=" block-center loading">
    Loading...
    {' '}
    {props.message}
  </div>
);
export default LoadingBox;
