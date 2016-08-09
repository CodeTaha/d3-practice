"use strict";

var React = require("react");
var AuthorForm = require('./authorForm.jsx');
var ManageAuthorPage = React.createClass({
	render: function() {
		return (
			<AuthorForm/>
		);
	}
});

module.exports = ManageAuthorPage;