export default (state = [], action) => {
    switch(action.type) {
        case 'ADD_DECISION':
            return [
                ...state,
                action.decision
            ];
        case 'SET_DECISIONS':
            return action.decisions;
        default:
            return state;
    };
};