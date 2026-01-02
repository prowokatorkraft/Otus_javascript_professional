import { useState } from 'react';

type UseModalResult = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
};

function useModal(): UseModalResult {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const open = (): void => setIsOpen(true);
    const close = (): void => setIsOpen(false);

    return { isOpen, open, close };
}

export default useModal;
