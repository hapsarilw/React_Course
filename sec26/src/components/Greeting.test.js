import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Greeting from "./Greeting";

describe('Greeting component', () => {
  test("renders Hello World as a text", () => {
    // Arrange
    render(<Greeting />);

    // Act
    // ... nothing

    // Assert
    const HelloWorldElement = screen.getByText("Hello World", { exact: false });
    expect(HelloWorldElement).toBeInTheDocument();
  });

  test('renders "good to see you" if the button was not clicked', () => {
    // Arrange
    render(<Greeting />);

    // Act    
    // ... nothing

    // Assert
    const outputElement = screen.getByText("It's good to see you!", { exact: false });
    expect(outputElement).toBeInTheDocument(); // Exist in the DOM
  });

  test('renders "Changed!" if the button was clicked', () => {
    // Arrange
    render(<Greeting />);

    // Act
    // ... nothing
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    // Assert
    const outputElement = screen.getByText("Changed!", { exact: false });
    expect(outputElement).toBeInTheDocument(); // Exist in the DOM
  });

  test('does not render "good to see you" if the button was clicked', () => {
    // Arrange
    render(<Greeting />);

    // Act    
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    // Assert
    const outputElement = screen.queryByText('good to see you!', { exact: false });
    expect(outputElement).toBeNull(); 
    
  });
});
