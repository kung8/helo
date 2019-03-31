import React, { Component } from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import routes from './routes';
import {withRouter} from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div className="body">
        <Nav location={this.props.location} logout={this.logout}/>
        {routes}
      </div>
    );
  }
}

export default withRouter(App);
