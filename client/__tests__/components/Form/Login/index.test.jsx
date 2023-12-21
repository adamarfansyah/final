import { fireEvent, render, act } from '@utils/testHelper';
import { Login } from '@components/Form';

const mockLogin = jest.fn((email, password) => Promise.resolve({ email, password }));

let wrapper;

beforeEach(() => {
  wrapper = render(<Login onSubmit={mockLogin} />);
});

describe('Component Login', () => {
  test('renders form with correct inputs and button', () => {
    const { getByTestId, getByText } = wrapper;
    const labelEmail = getByText(/email/i);
    const labelPassword = getByText(/password/i);
    const button = getByTestId('btn');

    expect(labelEmail).toBeInTheDocument();
    expect(labelPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('should called one time when button clicked', () => {
    const { getByPlaceholderText, getByTestId } = wrapper;
    const inputEmail = getByPlaceholderText(/e-mail/i);
    const inputPassword = getByPlaceholderText(/password/i);
    const button = getByTestId('btn');

    act(() => {
      fireEvent.change(inputEmail, {
        target: { value: 'test@example.com' },
      });
      fireEvent.change(inputPassword, {
        target: { value: 'password123' },
      });
    });

    expect(button).toBeInTheDocument();

    act(() => {
      fireEvent.submit(button);
    });

    expect(inputEmail).toHaveValue('test@example.com');
    expect(inputPassword).toHaveValue('password123');
  });

  test('Should match with snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
