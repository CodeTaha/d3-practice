// run this command to compile
// watchify -t [ babelify --presets [ react ] ] script3.js -o bundle.js

// A simple Game using React

var $ = jQuery = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
window.$ = $;
var Bootstrap = require('bootstrap');

var StarsFrame = React.createClass({
	render: function(){
		var numberOfStars = Math.round(Math.random()*9);
		var stars = [];
		for (var i=0; i<numberOfStars; i++){
			stars.push(
				<span className="glyphicon glyphicon-star"></span>
			);
		}
		return(
			<div id="stars-frame">
				<div className="well">
					{stars}
				</div>
			</div>
		);
	}
});

var ButtonFrame = React.createClass({
	render: function(){
		return(
			<div id='button-frame'>
				<button className="btn btn-primary">=</button>
			</div>
		);
	}
});

var AnswerFrame = React.createClass({
	render: function(){
		return(
			<div id='answer-frame'>
				<div className="well">
				...
				</div>
			</div>
		);
	}
});

var NumbersFrame = React.createClass({
	render: function(){
		var numbers = [];
		for (var i=1; i<=9; i++){
			numbers.push(
				<div className="number">{i}</div>
			);
		}
		return(
			<div id='numbers-frame'>
				<div className="well">
					{numbers}
				</div>
			</div>
		);
	}
});

var Game = React.createClass({
	render: function(){
		return(
			<div id='game'>
				<h2>Play Nine9</h2>
				<hr/>
				<div className="clearfix">
					<StarsFrame />
					<ButtonFrame/>
					<AnswerFrame/>
				</div>

				<NumbersFrame/>
			</div>
		);
	}
});

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);