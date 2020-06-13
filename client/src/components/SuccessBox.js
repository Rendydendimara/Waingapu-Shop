// Success Box component

import React from 'react';

const SuccessBox = (props) => (
  <div className="block-center text-success">
    {props.message}
  </div>
);

export default SuccessBox;
