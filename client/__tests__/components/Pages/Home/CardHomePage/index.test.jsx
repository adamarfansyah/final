import { render } from '@utils/testHelper';
import Card from '@pages/Home/Components/Card';
import badminton from '@static/images/badminton.svg';

const mockProps = {
  id: 1,
  name: 'Badminton',
  icon: badminton,
};

let wrapper;

beforeEach(() => {
  wrapper = render(<Card sport={mockProps} />);
});

describe('Card Home Page', () => {
  test('Should render correctly', () => {
    const { getByRole, getByText } = wrapper;
    const icon = getByRole('img', { name: /badminton/i });
    const text = getByText(/badminton/i);
    expect(text).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  test('Should match with snapshot', () => {
    const { asFragment } = wrapper;
    expect(asFragment()).toMatchSnapshot();
  });
});
