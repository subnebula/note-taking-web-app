const _ = require('lodash');
const api = require('../helpers/api');

const notesActionCreators = require('./notes');

// Action type constants
/* *** TODO: Put action constants here *** */

const REMOVE = 'notebooks/REMOVE';
const INSERT = 'notebooks/INSERT';

const initialState = {
  data: [
    { id: 100, title: 'From Redux Store: A hard-coded notebook' },
    { id: 101, title: 'From Redux Store: Another hard-coded notebook' },
  ]
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch(action.type) {
    /* *** TODO: Put per-action code here *** */

    case REMOVE: {

      // Remove deleted notebook from current list of notebooks
      // Then return updated list of notebooks
      const data = _.reject(state.data, {id: action.id});
      return _.assign({}, state, {data});
    }

    case INSERT: {

      // Combine existing notebooks with new notebook
      // Then return updated list of notebooks
      const data = _.concat(state.data, action.notebook);
      return _.assign({}, state, {data});
    }

    default: return state;
  }

}

// Action creators
/* *** TODO: Put action creators here *** */

reducer.removeNotebook = (notebookId) => {
  return {type: REMOVE, notebookId}
}

reducer.deleteNotebook = (notebookId) => {
  return (dispatch) => {
    api.delete('/notebooks/' + notebookId).then(() => {
      dispatch(reducer.removeNotebook(notebookId));
      dispatch(notesActionCreators.unloadNotes(notebookId));
    })
  };
};

reducer.createNotebook = (newNotebook) => {
  return (dispatch) => {
    api.post('/notebooks', newNotebook).then((notebook) => {
      dispatch(reducer.insertNotebook([notebook]));
    }).catch((err) => {
      console.error(err);
    });
  };
};

reducer.insertNotebook = (notebook) => {
  return {type: INSERT, notebook};
};

// Export the action creators and reducer
module.exports = reducer;
