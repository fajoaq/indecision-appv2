export default (state = [], action) => {
    switch(action.type) {
        case 'ADD_DECISION':
            return [
                ...state,
                action.decision
            ];
        case 'SET_EXPENSES':
            return action.expenses;
        default:
            return state;
    };
};