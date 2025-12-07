export function Router() {
    let listeners = [];
    let currentPath = location.pathname;
    let previousPath = null;

    const isMatch = (match, path) =>
        (match instanceof RegExp && match.test(path)) ||
        (typeof match === "function" && match(path)) ||
        (typeof match === "string" && match === path);

    const handleListener = ({ match, onEnter }) => {
        const args = { currentPath, previousPath, state: history.state };

        isMatch(match, currentPath) && onEnter(args);
    };

    const handleAllListeners = () => listeners.forEach(handleListener);

    const generateId = () => {
        const getRandomNumber = () =>
            Math.floor(Math.random() * listeners.length * 1000);
        const doesExist = (id) => listeners.find((listener) => listener.id === id);

        let id = getRandomNumber();
        while (doesExist(id)) {
            id = getRandomNumber();
        }
        return id;
    };

    const on = (match, onEnter) => {
        const id = generateId();

        const listener = { id, match, onEnter };
        listeners.push(listener);
        handleListener(listener);
    };

    const go = (url, state) => {
        previousPath = currentPath;
        history.pushState(state, url, url);
        currentPath = location.pathname;

        handleAllListeners();
    };

    window.addEventListener("popstate", handleAllListeners);

    return { on, go };
}