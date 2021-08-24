import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import FeedPage from "./components/FeedPage/FeedPage";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/" component={FeedPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/account" component={RegisterPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
