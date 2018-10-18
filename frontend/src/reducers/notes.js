const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
/* *** TODO: Put action constants here *** */
const SHOW_NOTES = 'notes/SHOW_NOTES';

const initialState = {
  data: [],
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
      return _.assign(
        {},
        state, {
        data: action.notes,
        notebookId: action.notebookId
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
      dispatch({ type: SHOW_NOTES, notebookId: notebookId, notes: notes });
    }).catch((err) => {
      console.error(err);
    });
  };
};

// Export the action creators and reducer
module.exports = reducer;
