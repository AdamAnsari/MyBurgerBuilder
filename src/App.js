import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  render() {
    return(
      <div>
        <Layout>
        {/*<h1>I am props.children :)</h1> -- I am a JSX Comment  */}
        {/*<BurgerBuilder />
        <Checkout />*/}
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
        </Layout>
      </div>
    )
  }
}

// function App() {
//   return (
//     <div>
//     <Layout>Hello</Layout>
//     </div>
//   );
// }

export default App;
