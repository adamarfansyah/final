import { render, act, fireEvent } from '@utils/testHelper';
import { Register } from '@components/Form';

const mockOnSubmit = jest.fn((email) => Promise.resolve({ email }));

let wrapper;

beforeEach(() => {
  wrapper = render(<Register onSubmit={mockOnSubmit} />);
});

describe('Component Register', () => {
  test('should render correctly', () => {
    const { getByText, getByTestId } = wrapper;
    const button = getByTestId('btn');
    const labelEmail = getByText(/email/i);

    expect(labelEmail).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('Should Input email have value', () => {
    const { getByPlaceholderText, getByTestId } = wrapper;
    const input = getByPlaceholderText('E-mail');
    const button = getByTestId('btn');

    act(() => {
      fireEvent.change(input, {
        target: { value: 'test@example.com' },
      });
    });

    expect(button).toBeInTheDocument();

    act(() => {
      fireEvent.submit(button);
    });

    expect(input).toHaveValue('test@example.com');
  });

  test('Should match with snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
