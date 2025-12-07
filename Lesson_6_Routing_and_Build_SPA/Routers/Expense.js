let counter = 1;

function addRow(value, store) {
    const row = document.createElement('div');
    row.style = 'transition: opacity 0.3s, max-height 0.3s; opacity: 1; max - height: 40px; ';
    row.textContent = counter + '. -' + value;

    row.addEventListener('click', () => {
        const confirmDelete = confirm('Do you want to remove this cost?');
        if (confirmDelete) {
            store.dispatch({ type: 'del-expense', payload: value });
        }
    });

    root.appendChild(row);
    counter++;
}

function render(root, store) {
    root.textContent = '';
    const expenses = store.getState().expenses;
    const addButton = document.createElement('button');
    addButton.textContent = 'Add expense cost';
    root.appendChild(addButton);

    counter = 1;
    for (let b of expenses) {
        addRow(b, store)
    }

    addButton.addEventListener('click', () => {
        const costInput = prompt('Enter cost:');
        const cost = parseFloat(costInput);
        if (!isNaN(cost) && isFinite(cost) && cost > 0) {
            store.dispatch({ type: 'add-expense', payload: cost });
        }
    });
}

export function Expense(root, store) {
    let subscription = store.subscribe(() => render(root, store));
    render(root, store);
    return subscription;
}