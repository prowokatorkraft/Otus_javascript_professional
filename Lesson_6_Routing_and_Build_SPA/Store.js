export function reducer (state, action) {
    switch (action.type) {
        case 'add-income': {
            return {
                ...state,
                incomes: [
                    ...state.incomes,
                    {
                        id: crypto.randomUUID(),
                        value: action.payload
                    }
                ]
            };
        }
        case 'del-income': {
            var arr = state.incomes;
            arr = arr.filter(i => i.id != action.payload);
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
                    {
                        id: crypto.randomUUID(),
                        value: action.payload
                    }
                ]
            };
        }
        case 'del-expense': {
            var arr = state.expenses;
            arr = arr.filter(i => i.id != action.payload);
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

export function configureStore (reducer) {
    let state = null;
    let subscribes = [];
    return {
        getState() {
            if (state == null) {
                try {
                    let data = localStorage.getItem('data');
                    let decodedData = decodeURIComponent(atob(data ?? ''));
                    state = JSON.parse(decodedData);
                } catch {
                    state = { incomes: [], expenses: [] };
                    console.info('Data did not download!'); 
                }
            }
            return state
        },
        dispatch(action) {
            state = reducer(state, action);
            for (var cb of subscribes) {
                cb();
            }
            try {
                let data = JSON.stringify(state);
                let encoded = btoa(encodeURIComponent(data));
                localStorage.setItem('data', encoded);
            } catch {
                console.error('Data did not upload!');
            }
        },
        subscribe(cb) {
            subscribes.push(cb);
            return () => subscribes = subscribes.filter(c => c != cb);
        }
    };
};