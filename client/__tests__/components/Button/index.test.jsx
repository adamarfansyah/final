import { render, fireEvent } from '@testing-library/react';
import Button from '@components/Button';

describe('Component Button', () => {
  test('Should render correctly with default variant', () => {
    const { getByText } = render(<Button>Click me</Button>);
    const button = getByText('Click me');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn');
  });

  test('Should render correctly with secondary variant', () => {
    const { getByText } = render(<Button variant="secondary">Click me</Button>);
    const button = getByText('Click me');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btnSecondary');
  });

  test('Should call onClick prop when button is clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(<Button onClick={onClickMock}>Click me</Button>);
    const button = getByText('Click me');
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('Should be disabled when disabled prop is true', () => {
    const { getByText } = render(<Button disabled>Click me</Button>);
    const button = getByText('Click me');
    expect(button).toBeDisabled();
  });

  test('Should match with snapshot', () => {
    const { asFragment } = render(<Button>Click me</Button>);
    expect(asFragment()).toMatchSnapshot();
  });
});
