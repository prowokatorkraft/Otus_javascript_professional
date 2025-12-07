export function reducer (state, action) {
    switch (action.type) {
        case 'add-income': {
            return {
                ...state,
                incomes: [
                    ...state.incomes,
                    action.payload
                ]
            };
        }
        case 'del-income': {
            var arr = state.incomes;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === action.payload) {
                    arr.splice(i, 1);
                    break;
                }
            }
            return {
                ...state,
                incomes: [
                    ...arr
                ]
            };
        }
        case 'add-expense': {
            return {
                ...state,
                expenses: [
                    ...state.expenses,
                    action.payload
                ]
            };
        }
        case 'del-expense': {
            var arr = state.expenses;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === action.payload) {
                    arr.splice(i, 1);
                    break;
                }
            }
            return {
                ...state,
                expenses: [
                    ...arr
                ]
            };
        }
        default:
            return state;
    }
};

export function configureStore (reducer, initialState) {
    let state = initialState
    let cbc = [];
    return {
        getState() {
            return state
        },
        dispatch(action) {
            state = reducer(state, action);
            for (var cb of cbc) {
                cb();
            }
        },
        subscribe(cb) {
            cbc.push(cb);
            return () => cbc = cbc.filter(c => c != cb);
        }
    };
};