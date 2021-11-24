import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import Navigation from "./navigate";

it('renders without crashing', () => {
  const div = document.createElement('div');
  // ReactDOM.render(<App />, div);
  ReactDOM.render(<Navigation />, div);

  ReactDOM.unmountComponentAtNode(div);
});
