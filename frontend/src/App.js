import './App.css';
import Login from './components/LoginPage/Login';
import { Provider } from "react-redux"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import store from './store';
function App({ history }) {
  return (
    <>
      <Provider store={store}>
        <Login />
        {/* <Switch>
        <Route exact path='/' component={Login} />
      </Switch> */}
      </Provider>
    </>
  );
}

export default App;
