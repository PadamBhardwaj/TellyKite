import './App.css';
import Login from './components/LoginPage/Login';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Login} />
      </Switch>
    </>
  );
}

export default App;
