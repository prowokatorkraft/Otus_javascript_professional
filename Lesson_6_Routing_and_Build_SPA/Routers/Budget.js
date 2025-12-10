function render(root, store) {
    root.textContent = '';
    const state = store.getState();
    let totalCost = 0;
    for (var cost of state.incomes) {
        totalCost += cost.value;
    }
    for (var cost of state.expenses) {
        totalCost -= cost.value;
    }

    const costContainer = document.createElement("div");
    costContainer.style = "font-family: Arial, sans-serif; padding: 8px; background - color: #f0f0f0; border - radius: 4px; ";

    const label = document.createElement("span");
    label.style = "font-weight: bold;";
    label.textContent = "Total cost: ";

    const value = document.createElement("span");
    value.style = "color: #d35400;";
    value.textContent = totalCost.toFixed(2);

    costContainer.appendChild(label);
    costContainer.appendChild(value);

    root.appendChild(costContainer);
}

export function Budget(root, store) {
    let subscription = store.subscribe(() => render(root, store));
    render(root, store);
    return subscription;
}