import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MainPage from './index.tsx';

test("renders a heading", ():void => {
    render(
        <BrowserRouter>
            <MainPage />
        </BrowserRouter>
    );
    const heading = screen.getByRole("heading", {
        name: /mainpage/i,
    });
    expect(heading).toBeInTheDocument();
});




test('renders a placeholder message for this yet-to-be-filled site', () => {
    render(
        <BrowserRouter>
            <MainPage />
        </BrowserRouter>
    );
    const message = screen.getByText(/imagine mainpage content/i);
    expect(message).toBeInTheDocument();
});