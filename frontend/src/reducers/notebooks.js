const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
/* *** TODO: Put action constants here *** */
const UPDATE = 'notes/UPDATE';

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
    case UPDATE: {
      return _.assign(
        {},
        state,
        { activeNotebookId: action.notebookId, notes: action.notes }
      );
    }
  }
    return state;


}

// Action creators
/* *** TODO: Put action creators here *** */

reducer.loadNotes = (notebookId) => {
  return (dispatch) => {
    api.get('/notebooks/' + notebookId + '/notes').then((notes) => {
      dispatch({ type: UPDATE, notebookId, notes })
    });
  };
};

// Export the action creators and reducer
module.exports = reducer;
