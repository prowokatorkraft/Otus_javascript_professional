let counter = 1;

function addRow(state, store) {
    const row = document.createElement('div');
    row.style = 'transition: opacity 0.3s, max-height 0.3s; opacity: 1; max - height: 40px; ';
    row.setAttribute('id', state.id);
    row.textContent = counter + '. +' + state.value;

    row.addEventListener('click', () => {
        const confirmDelete = confirm('Do you want to remove this cost?');
        if (confirmDelete) {
            store.dispatch({ type: 'del-income', payload: state.id });
        }
    });

    root.appendChild(row);
    counter++;
}

function render(root, store) {
    root.textContent = '';
    const incomes = store.getState().incomes;

    const addButton = document.createElement('button');
    addButton.textContent = 'Add income cost';
    root.appendChild(addButton);

    counter = 1;
    for (let b of incomes) {
        addRow(b, store)
    }

    addButton.addEventListener('click', () => {
        const costInput = prompt('Enter cost:');
        const cost = parseFloat(costInput);
        if (!isNaN(cost) && isFinite(cost) && cost > 0) {
            store.dispatch({ type: 'add-income', payload: cost });
        }
    });
}

export function Income(root, store) {
    let subscription = store.subscribe(() => render(root, store));
    render(root, store);
    return subscription
}