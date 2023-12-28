import { render } from '@testing-library/react';
import { formattedTimeCardSchedule } from '@utils/generateTimeSchedule';
import Receipts from '@components/Receipts';

const mockProps = {
  id: 1,
  BookedVenue: {
    name: 'Lapangan gbk 1',
  },
  userBook: {
    firstName: 'Adam Sake',
    lastName: 'Arfansyah',
  },
  merchantBook: {
    name: 'Gelora Bung Karno',
  },
  orderId: 'Lapangan GBK 1-1702866864-2',
  startBook: '2023-12-17T07:00',
  endBook: '2023-12-17T08:00',
  amount: '20000000',
  createdAt: '2023-12-17T13:54:52',
};

const wrapper = render(<Receipts transactionDetail={mockProps} />);

describe('Receipts Component', () => {
  test('renders correctly with transaction details', () => {
    const { getByText, getByTestId } = wrapper;
    expect(getByText(/Receipt/i)).toBeInTheDocument();
    expect(getByTestId('ReceiptTitle')).toBeInTheDocument();
    expect(getByText(mockProps.BookedVenue.name)).toBeInTheDocument();
    expect(getByText(`${mockProps.userBook.firstName} ${mockProps.userBook.lastName}`)).toBeInTheDocument();
    expect(getByText(mockProps.merchantBook.name)).toBeInTheDocument();
    expect(
      getByText(formattedTimeCardSchedule({ start: mockProps.startBook, end: mockProps.endBook }))
    ).toBeInTheDocument();
    expect(getByText('Rp 20.000.000,00')).toBeInTheDocument();
  });

  test('Should match with snapshot', () => {
    const { asFragment } = wrapper;
    expect(asFragment()).toMatchSnapshot();
  });
});
