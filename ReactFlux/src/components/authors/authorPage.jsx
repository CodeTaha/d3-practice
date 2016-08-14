"use strict";

var React = require('react');
//var AuthorApi = require('../../api/authorApi');//Before flux
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../store/authorStore');
var AuthorList = require('./authorList.jsx');
var Link = require('react-router').Link;
var AuthorPage = React.createClass({
	getInitialState: function() {
		return {
			//authors:[] // Before Flux
			authors:AuthorStore.getAllAuthors()
		};
	},
	/* Was needed Before Flux
	componentDidMount: function(){
		if(this.isMounted()) {
			this.setState({authors: AuthorApi.getAllAuthors()});
			//this.setState({authors: AuthorStore.getAllAuthors()});// can use it with flux as well
		}
	},*/
	componentWillMount: function() {
	      AuthorStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
	      AuthorStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		debugger;
		this.setState({ authors:AuthorStore.getAllAuthors()});
	},

	render: function() {
		return (
			<div>
				<h1>Authors</h1>
				<Link to="addAuthor" className="btn btn-default"> Add Author </Link>
				<AuthorList authors={this.state.authors} />
			</div>
		);
	}
});

module.exports = AuthorPage;