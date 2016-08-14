"use strict";
var React = require('react');
var Router = require('react-router');
var routes = require('./routes.jsx');
var InitializeActions = require('./actions/initializeActions');

InitializeActions.initApp();

//Router.run(routes, Router.HistoryLocation, function(Handler){
Router.run(routes, function(Handler){
	React.render(<Handler/>, document.getElementById('app'));
})
/*
var App = React.createClass({
	render: function() {
		var Child;
		switch(this.props.route){
			case 'about': Child = About; break;
			case 'authors': Child = Authors; break;
			default: Child = Home;
		}

		return (
			<div>
				<Header />
				<Child/>
			</div>
		);
	}
});

function render() {
	var route = window.location.hash.substr(1);
	ReactDom.render(<App route={route }/>, document.getElementById('app'));
}

window.addEventListener('hashchange',render);
render();
*/