import React from 'react';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/User/Login';
import '../styles/common/app.css';
import '../styles/common/background.css';

const RootRouter = withRouter(({ location }) => {
  return (
    <>
      <Route path="/" exact component={Login} />
      {location.pathname !== '/' && <Route component={App} />}
    </>
  );
});

function Root() {
  return (
    <BrowserRouter>
      <RootRouter />
    </BrowserRouter>
  );
}

export default Root;
