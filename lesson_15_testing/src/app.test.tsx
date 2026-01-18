
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

// явно указываем типы дл€ компонентов и тестов
describe('App', () => {
    it('renders correctly', () => {
        // –ендерим компонент
        render(<App />);

        const element = screen.getByText('Vite + React') as HTMLElement;

        expect(element).toBeInTheDocument();
    });
});