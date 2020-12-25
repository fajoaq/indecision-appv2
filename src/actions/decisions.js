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