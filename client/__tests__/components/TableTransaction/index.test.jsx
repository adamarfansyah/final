import { render, fireEvent } from '@utils/testHelper';
import TableTransaction from '@components/TableTransaction';

const mockNavigate = jest.fn();

const mockProps = [
  {
    id: 1,
    BookedVenue: {
      name: 'Lapangan gbk 1',
    },
    orderId: 'Lapangan GBK 1-1702866864-2',
    startBook: '2023-12-17T07:00',
    endBook: '2023-12-17T08:00',
    amount: '20000000',
  },
  {
    id: 2,
    BookedVenue: {
      name: 'Lapangan gbk 2',
    },
    orderId: 'Lapangan GBK 2-1402866864-2',
    startBook: '2023-12-17T07:00',
    endBook: '2023-12-17T08:00',
    amount: '20000000',
  },
];

let wrapper;

beforeEach(() => {
  wrapper = render(<TableTransaction transactions={mockProps} navigate={mockNavigate} />);
});

describe('Table Transaction', () => {
  test('Should render correctly', () => {
    const { getByTestId } = wrapper;
    expect(getByTestId('TableTransaction')).toBeInTheDocument();
  });

  test('Should get transaction id when button clicked', () => {
    const { queryAllByTestId } = wrapper;
    const buttons = queryAllByTestId('btn');
    const button = buttons[0];

    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith(mockProps[0].id);
  });

  test('Should display correct formatted amount', () => {
    const { queryAllByTestId } = wrapper;
    const amounts = queryAllByTestId('transaction-amount');
    const amount = amounts[0];
    expect(amount).toBeInTheDocument();
  });

  test('Should match with snapshot', () => {
    const { asFragment } = wrapper;
    expect(asFragment()).toMatchSnapshot();
  });
});
