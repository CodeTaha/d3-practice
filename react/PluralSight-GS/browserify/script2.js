// run this command to compile
// watchify -t [ babelify --presets [ react ] ] script2.js -o bundle.js

// This code adds Github names and profile pic using React
var $ = jQuery = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');

var Card = React.createClass({
	getInitialState:function(){
		return {};
	},
	componentDidMount: function(){
		var component = this;
		$.get("https://api.github.com/users/"+ this.props.login, function(data){
			component.setState(data);
		});
	},
	render: function(){
		return(
			<div>
				<img width="80px" src = {this.state.avatar_url} />
				<h3>{this.state.name}</h3>
				<hr/>
			</div>
		)
	}
});

var Form = React.createClass({
	handleSubmit: function(e){
		e.preventDefault();
		var login = ReactDOM.findDOMNode(this.refs.login);
		//Add the card here
		this.props.addCard(login.value);
		console.log(login.value);
		login.value = '';
	},
	render: function(){
		return (
			<form onSubmit= {this.handleSubmit}>
				<input type="text" placeholder="Github name" ref="login"/>
				<button>Add</button>
			</form>
		)
	}
});
var Main = React.createClass({
	getInitialState: function(){
		return {logins:["codetaha","zpao","petehunt"]};
	},
	addCard: function(loginid){
		this.setState({logins:this.state.logins.concat(loginid)});
	},
	render: function(){
		var cards = this.state.logins.map(function(login){
			return (<Card login={login} />)
		});
		return(
			<div>
				<Form addCard = {this.addCard}/>
				{cards}
			</div>
		)
	}
});

ReactDOM.render(<Main />, document.getElementById("root"));