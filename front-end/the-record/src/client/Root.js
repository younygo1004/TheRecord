import React from 'react';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import App from '../App';
import Login from '../pages/User/Login';
import SignUp from '../pages/User/SignUp';
import '../styles/common/app.css';
import '../styles/common/background.css';
import store from '../store';

const persistor = persistStore(store);

const RootRouter = withRouter(({ location }) => {
  return (
    <>
      <Route path="/" exact component={Login} />
      <Route path="/signup" exact component={SignUp} />
      {location.pathname !== '/' && location.pathname !== '/signup' && (
        <Route component={App} />
      )}
    </>
  );
});

function Root() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootRouter />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default Root;
