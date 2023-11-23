import { render, screen } from "@testing-library/react";
import MainPage from "./index.tsx";
import '@testing-library/jest-dom';


test("renders a heading", (): void => {
    render(<MainPage />);
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("MainPage");
});
