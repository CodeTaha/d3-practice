"use strict";

var React = require('react');
var Link = require('react-router').Link;
var AuthorList = React.createClass({
	propTypes: {
		// Checks if prop is passed by the Parent component
		authors: React.PropTypes.array.isRequired
	},
	render: function() {
		// <a href={"/#author/" + author.id}>{author.id}</a>
		var createAuthorRow = function(author) {
			return (
				<tr key={author.id}>
					<td>
						<Link to="manageAuthor" params={{id: author.id}}>
							{author.id}
						</Link>
						
					</td>
					<td>
						{author.firstName} {author.lastName}
					</td>
				</tr>
			);
		};
		return (
			<div>
				<table className="table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
						</tr>
					</thead>
					<tbody>
						{this.props.authors.map(createAuthorRow,this)}
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = AuthorList;