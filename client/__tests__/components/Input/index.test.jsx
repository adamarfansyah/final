import { render, fireEvent, cleanup } from '@testing-library/react';
import Input from '@components/Input';

const mockRegister = jest.fn();
const mockValidationSchema = {
  required: 'This field is required',
};

const mockErrors = {
  password: {
    message: 'Password is required',
  },
};
const mockProps = {
  name: 'password',
  label: 'Password',
  type: 'password',
};

afterEach(() => {
  cleanup();
});

describe('Component Input', () => {
  test('should render correctly', () => {
    const { getByTestId } = render(
      <Input
        name={mockProps.name}
        label={mockProps.label}
        register={mockRegister}
        errors={mockErrors}
        type={mockProps.type}
        validationSchema={mockValidationSchema}
      />
    );
    const input = getByTestId('input-container');
    const label = getByTestId('input-label');
    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  test('toggles password visibility when the password icon is clicked', () => {
    const { getByTestId } = render(
      <Input
        name={mockProps.name}
        label={mockProps.label}
        register={mockRegister}
        type={mockProps.type}
        errors={{}}
        validationSchema={mockValidationSchema}
      />
    );
    const passwordInput = getByTestId('input');
    const visibilityIcon = getByTestId('visibility-icon');
    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(visibilityIcon);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  test('Should render has error', () => {
    const { getByText } = render(
      <Input
        name={mockProps.name}
        label={mockProps.label}
        register={mockRegister}
        errors={mockErrors}
        type={mockProps.type}
        validationSchema={mockValidationSchema}
      />
    );
    const error = getByText('Password is required');
    expect(error).toBeInTheDocument();
  });

  test('Should match with snapshot', () => {
    const { asFragment } = render(
      <Input
        name={mockProps.name}
        label={mockProps.label}
        register={mockRegister}
        type={mockProps.type}
        errors={() => {}}
        validationSchema={mockValidationSchema}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
