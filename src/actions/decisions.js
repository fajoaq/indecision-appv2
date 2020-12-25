import database from '../firebase/firebase';


// START ADD_DECISION
export const startAddDecision = (decision) => {
    return (dispatch, getState) => {
      const uid = getState().auth.uid;
      const {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
      } = expenseData;
  
      const expense = { description, note, amount, createdAt };
      return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
        dispatch(addExpense({
          id: ref.key,
          ...expense
        }));
      });
    };
  };

// ADD_DECISION
export const addDecision = (decision) => ({
    type: 'ADD_DECISION',
    decision
  });