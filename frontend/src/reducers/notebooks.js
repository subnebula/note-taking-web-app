const _ = require('lodash');
const api = require('../helpers/api');

const notesActionCreators = require('./notes');

// Action type constants
/* *** TODO: Put action constants here *** */

const REMOVE = 'notebooks/REMOVE';

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
      const data = _.reject(state.data, {id: action.id});
      return _.assign({}, state, {data});
    }

    default: return state;
  }

}

// Action creators
/* *** TODO: Put action creators here *** */

reducer.removeNotebook = (id) => {
  return {type: REMOVE, id}
}

reducer.deleteNotebook = (notebookId) => {
  return (dispatch) => {
    api.delete('/notebooks/' + notebookId).then(() => {
      dispatch(reducer.removeNotebook(notebookId));
      dispatch(notesActionCreators.unloadNotes(notebookId));
    })
  };
}

// Export the action creators and reducer
module.exports = reducer;
