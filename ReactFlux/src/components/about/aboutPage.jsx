"use strict";

var React = require ("react");

var About = React.createClass({
	statics:{
		willTransitionTo: function(transition,params,query,callback) {
			//called before transition occurs
			if(!confirm('Are you sure?')){
				console.log(transition)
				transition.abort();
			} else {
				callback();
			}
		},
		willTransitionFrom: function(transition,component) {
			//called when transition occurs from this page
			if(!confirm('Are you sure you wanna leave?')){
				console.log(transition)
				transition.abort();
			}
		}
	},
	render: function () {
		return (
			<div>
				<h1>About</h1>
				<p> 
					This application uses the following technologies:
					<li>React</li>
					<li>Flux</li>
					<li>React Router</li>
					<li>Node</li>
					<li>Gulp</li>
					<li>Browserify</li>
					<li>Bootstrap</li>
					<li>Lint</li>

				</p>
			</div>
		);
	}
});

module.exports = About;