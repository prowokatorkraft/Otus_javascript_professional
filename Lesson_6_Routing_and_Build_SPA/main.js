import { Router } from './Router.js';
import { Budget } from './Routers/Budget.js';
import { Income } from './Routers/Income.js';
import { Expense } from './Routers/Expense.js';
import { reducer, configureStore } from './Store.js';

const state = {
    incomes: [ 1223.6, 84.09 ],
    expenses: [ 226.4, 75.83, 4.66 ]
};
const store = configureStore(reducer, state);

let removeSubscribe = () => { };
const createRender = (route) => (...args) => {
    removeSubscribe();
    removeSubscribe = route(document.getElementById("root"), store);
};

const router = Router();

router.on(/.*/, createRender(Budget)); // budget
router.on("/income", createRender(Income));
router.on("/expense", createRender(Expense));

document.body.addEventListener("click", (event) => {
    if (!event.target.matches("a")) {
        return;
    }
    event.preventDefault();
    let url = event.target.getAttribute("href");
    router.go(url);
});