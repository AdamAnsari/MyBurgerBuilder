import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  render() {
    return(
      <div>
        <Layout>
        {/*<h1>I am props.children :)</h1> -- I am a JSX Comment  */}
        <BurgerBuilder />
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
