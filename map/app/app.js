require('babel-core/polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router');
var Firebase = require('firebase');
var {Route, DefaultRoute, NotFoundRoute, RouteHandler} = Router;

var Header = require('./components/Header');
var Footer = require('./components/Footer');
var LocationDescription = require('./components/LocationDescription');
var GoogleMap = require('./components/GoogleMap');
var Select = require('react-select');
require('react-select/dist/react-select.css');


require('./bower_components/bootstrap/dist/css/bootstrap.css');
require('./assets/styles/app.scss');


// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCGpw7C2mlRmYuahQIZjpKeOVQ35Y_-Zfo',
  authDomain: 'appmap-ad311.firebaseapp.com',
  databaseURL: 'https://appmap-ad311.firebaseio.com',
  storageBucket: 'appmap-ad311.appspot.com'
};

Firebase.initializeApp(config);
var database = firebase.database();



var App = React.createClass({
  getInitialState: function() {
    return {locations: [],
    details:{}
    };
  },
  LoadLocations:function () {
    database.ref().once('value').then(function(data) {
      this.setState({locations: data.val()});
    }.bind(this));
  },
  GetLocation: function(val) {
    this.setState({details: val});
  },
  componentDidMount: function() {
    this.LoadLocations();
  },
  render: function () {
    return (
      <div className='layout-page'>
        <Header/>
        <main className='layout-main'>
          <div className='container'>

            <Select name='form-field-name' labelKey='name' options={this.state.locations} onChange={this.GetLocation} />
            <LocationDescription details={this.state.details}/>
            <GoogleMap/>
            <RouteHandler/>
          </div>
        </main>
        <Footer/>
      </div>
    );
  }
});

var PageHome = require('react-proxy?name=page-normal!./components/PageHome');
var PageNormal = require('react-proxy?name=page-normal!./components/PageNormal');
var PageNested = require('react-proxy?name=page-nested!./components/PageNested');
var PageNestedDefault = require('react-proxy?name=page-nested-default!./components/PageNestedDefault');
var PageNestedSub = require('react-proxy?name=page-nested-sub!./components/PageNestedSub');
var PageNotFound = require('react-proxy?name=page-not-found!./components/PageNotFound');

var routes = (
  <Route name='app' path='/' handler={App}>
    <DefaultRoute handler={PageHome}/>
    <Route name='page-normal' path='normal' handler={PageNormal}/>
    <Route name='page-nested' path='nested' handler={PageNested}>
      <DefaultRoute handler={PageNestedDefault}/>
      <Route name='page-nested-sub' path='sub' handler={PageNestedSub}/>
    </Route>
    <NotFoundRoute name='page-not-found' handler={PageNotFound}/>
  </Route>
);

function run() {
  Router.run(routes, Router.HistoryLocation, function (Handler) {
    if (document.body.className.indexOf('render') === -1) {
      document.body.className += document.body.className.length ? ' render' : 'render';
    }
    ReactDOM.render(<Handler/>, document.body);
  });
}

if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', run);
} else {
  window.attachEvent('onload', run);
}
