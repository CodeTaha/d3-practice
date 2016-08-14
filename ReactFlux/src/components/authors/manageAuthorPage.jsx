"use strict";

var React = require("react");
var Router = require('react-router');
var AuthorForm = require('./authorForm.jsx');
//var AuthorApi = require('../../api/authorApi'); //Used before flux
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../store/authorStore');
var toastr = require('toastr');
var ManageAuthorPage = React.createClass({
	mixins: [
		Router.Navigation //used by saveAuthor method for transitionTo
	],

	statics: {
		willTransitionFrom: function(transition,component) {
			//Check if there is unsaved form data
			
			if(component.state.dirty){
				if(!confirm('Are you sure you want to leave without saving?')){
					console.log(transition)
					transition.abort();
				}	
			}
		}
	},

	getInitialState: function(){
		console.log("Initial state")
		return {
			author: {id:'', firstName: '', lastName:''},
			errors: {},
			dirty: false
		};
	},

	componentWillMount: function(){
		/*used when parameters are called for editing instead of creating new
		Called before component is mounted instead ComponentDidMount
		Calling set state in this function wont call a re render 
		*/
		console.log("component will mount")
		var authorId = this.props.params.id; // from the path '/author/:id'

		if(authorId){
			//this.setState({author: AuthorApi.getAuthorById(authorId)})// before flux
			this.setState({author: AuthorStore.getAuthorById(authorId)})
		}

	},

	setAuthorState: function(event) {
		this.setState({dirty:true});
		var field = event.target.name;
		var value = event.target.value;
		this.state.author[field] = value;
		//console.log(this.state.author)
		return this.setState({author:this.state.author});
	},

	authorFormIsValid: function(){
		var formIsValid = true;
		this.state.errors = {}; //clear previous errors
		if(this.state.author.firstName.length < 2){
			this.state.errors.firstName = 'First Name must be atleast 2 characters';
			formIsValid = false;
		}
		if(this.state.author.lastName.length < 2){
			this.state.errors.lastName = 'Last Name must be atleast 2 characters';
			formIsValid = false;
		}
		this.setState({errors:this.state.errors});
		return formIsValid;
	},

	saveAuthor: function(event){
		event.preventDefault();
		if(!this.authorFormIsValid()){
			return;
		}
		//AuthorApi.saveAuthor(this.state.author);
		if (this.state.author.id) {
			AuthorActions.updateAuthor(this.state.author);
		} else {
			AuthorActions.createAuthor(this.state.author);
		}
		this.setState({dirty:false});
		toastr.success('Author saved');
		this.transitionTo('authors');
	},

	render: function() {
		return (
			<AuthorForm 
				author={this.state.author}
				onChange={this.setAuthorState}
				onSave = {this.saveAuthor}
				errors={this.state.errors}
			/>
		);
	}
});

module.exports = ManageAuthorPage;