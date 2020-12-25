import database from '../firebase/firebase';


// START ADD_DECISION
export const startAddDecision = (decisionData = {}) => {
    return (dispatch, getState) => {
      const uid = getState().auth.uid;
      const {
        decisionTitle = '',
        option = '',
      } = decisionData;
  
      const decision = { decisionTitle, option };
      return database.ref(`users/${uid}/decisions`).push(decision).then((ref) => {
        dispatch(addDecision({
          id: ref.key,
          ...decision
        }));
      });
    };
  };

// ADD_DECISION
export const addDecision = (decision) => ({
    type: 'ADD_DECISION',
    decision
  });

  //START SET_EXPENSES
export const startSetDecisions = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
     return database.ref(`users/${uid}/decisions`).once('value').then((snapshot) => {
      const decisions = [];
      snapshot.forEach((decision) => {
        decisions.push({
          id: decision.key,
          ...decision.val()
        });
      });
      dispatch(setDecisions(decisions));
    });
  };
};

// SET_EXPENSES
export const setDecisions = (decisions) => ({
  type: 'SET_DECISIONS',
  decisions
});
