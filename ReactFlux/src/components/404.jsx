"use strict";

var React = require ("react");
var Router = require('react-router');
var Link = Router.Link;
var page404 = React.createClass({
	render: function () {
		return (
			<div>
				<h1>Page Not Found</h1>
				<p>Thats all Folks!!</p>
				<p><Link to='app'>Back to Home</Link></p>
			</div>
		);
	}
});

module.exports = page404;