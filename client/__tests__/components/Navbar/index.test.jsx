import { render } from '@utils/testHelper';

import Navbar from '@components/Navbar';

const mockLocation = jest.fn();
// const mockDispatch = jest.fn();

// jest.mock('react-redux', () => ({
//   useDispatch: () => mockDispatch,
// }));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: () => mockLocation,
}));

describe('Navbar Component', () => {
  test('Correct render', () => {
    const navbar = render(<Navbar title="Title" locale="en" theme="light" />);
    expect(navbar.getByTestId('navbar')).toBeInTheDocument();
  });

  test('Should match with snapshot', () => {
    const navbar = render(<Navbar title="Title" locale="en" theme="light" />);
    expect(navbar).toMatchSnapshot();
  });
});
