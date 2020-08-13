import React,{Fragment} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css'
import './css/Add.css'
import './css/icons.css'
import Main from './components/Main';

// Redux
import { Provider } from 'react-redux'
import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Main />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;