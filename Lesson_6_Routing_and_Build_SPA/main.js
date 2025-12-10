import { Router } from './Router.js';
import { Budget } from './Routers/Budget.js';
import { Income } from './Routers/Income.js';
import { Expense } from './Routers/Expense.js';
import { reducer, configureStore } from './Store.js';

const store = configureStore(reducer);

let removeSubscribe = () => { };
const createRender = (route) => (...args) => {
    removeSubscribe();
    removeSubscribe = route(document.getElementById("root"), store);
};

const router = Router();

router.on('/', createRender(Budget));
router.on("/income", createRender(Income));
router.on("/expense", createRender(Expense));

document.body.addEventListener("click", (event) => {
    let link = event.target.closest("a");
    if (!link) {
        return;
    }
    event.preventDefault();
    let url = link.getAttribute("href");
    router.go(url);
});