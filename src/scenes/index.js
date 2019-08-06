import { hot } from "react-hot-loader/root";
import React, { Component } from "react";
import { Route, Switch, HashRouter } from "react-router-dom";

/*************************************************************/
// Route Based Code Splitting
/*************************************************************/
const HomeComponent = React.lazy(() => import("./home"));
const Home = props => {
  return (
    <React.Suspense fallback={<h2>Loading...</h2>}>
      <HomeComponent {...props} />
    </React.Suspense>
  );
};

const ContactComponent = React.lazy(() => import("./contact"));
const Contact = props => {
  return (
    <React.Suspense fallback={<h2>Loading...</h2>}>
      <ContactComponent {...props} />
    </React.Suspense>
  );
};

class Scenes extends Component {
  render() {
    return (
      <div className="scenes">
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/contact" component={Contact} />
            <Route component={Home} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default hot(Scenes);
