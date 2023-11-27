import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import MainPage from './index.tsx';

test("renders a heading", (): void => {
    render(
        <BrowserRouter>
            <MainPage/>
        </BrowserRouter>
    );
    const heading: HTMLElement = screen.getByRole("heading", {
        name: /mainpage/i,
    });
    expect(heading).toBeInTheDocument();
});