const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
/* *** TODO: Put action constants here *** */
const SHOW_NOTES = 'notes/show_notes';

const initialState = {
  data: [
    { id: 100, title: 'From Redux Store: A hard-coded notebook' },
    { id: 101, title: 'From Redux Store: Another hard-coded notebook' },
  ],
  notebookId: -1
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch(action.type) {
    /* *** TODO: Put per-action code here *** */
    case SHOW_NOTES: {
      return _.assign({}, state,
      {   notebookId: action.notebookId,
          notes: action.notes
      });
    }
  }
    return state;


}

// Action creators
/* *** TODO: Put action creators here *** */

reducer.loadNotes = (notebookId) => {
  return (dispatch) => {
    api.get('/notebooks/' + notebookId + '/notes').then((notes) => {
      dispatch({ type: SHOW_NOTES, notebookId: notebookId, notes: notes })
    });
  };
};

// Export the action creators and reducer
module.exports = reducer;
