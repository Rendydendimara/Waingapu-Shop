// Error box component

import React from 'react';

const ErrorBox = (props) => (
  <div className="block-center text-error">
    {props.message}
  </div>
);

export default ErrorBox;
