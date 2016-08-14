"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorApi = require('../api/authorApi');
var ActionTypes = require('../constants/actionTypes');

var InitializeActions = {
	initApp: function() {
		// Dispatcher tells all the stores that
		// an author has just been created
		Dispatcher.dispatch({
			actionType:  ActionTypes.INITIALIZE,
			initialData: {
				authors: AuthorApi.getAllAuthors()
			}
		});
	}
};

module.exports = InitializeActions;