const formattedNumber = (number) => {
  const convertToRupiah = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);

  return convertToRupiah;
};

export default formattedNumber;
