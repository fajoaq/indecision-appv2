export default (state = [], action) => {
    switch(action.type) {
        case 'ADD_DECISION':
            return [
                ...state,
                action.decision
            ];
        case 'LOGOUT':
            return [];
        default:
            return state;
    };
};