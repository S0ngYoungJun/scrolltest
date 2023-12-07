import React from 'react';
import ReactDOM from 'react-dom';
import FullpageWrapper from './FullpageWrapper';

const fullpageOptions = {
  anchors: ['video', 'photo', 'box'],
  sectionsColor: ['#000000', '#ffffff', '#cccccc'],
};

ReactDOM.render(<FullpageWrapper fullpageOptions={fullpageOptions} />, document.getElementById('root'));