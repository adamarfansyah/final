import { render } from '@utils/testHelper';
import UpdatePassword from '@components/UpdatePassword';

const mockOnSubmit = jest.fn();

let wrapper;

beforeEach(() => {
  wrapper = render(<UpdatePassword onSubmit={mockOnSubmit} />);
});

describe('Component Update Password', () => {
  test('renders form with correct inputs and button', () => {
    const { getByTestId, getByText } = wrapper;
    expect(getByText(/new password/i)).toBeInTheDocument();
    expect(getByText(/confirm password/i)).toBeInTheDocument();
    expect(getByTestId('btn')).toBeInTheDocument();
  });

  test('Should match with snapshot', () => {
    const { asFragment } = wrapper;
    expect(asFragment()).toMatchSnapshot();
  });
});
