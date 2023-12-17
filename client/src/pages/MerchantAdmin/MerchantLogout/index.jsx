import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutMerchant } from '@pages/AuthMerchant/actions';

const MerchantLogout = ({ merchant }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (merchant) {
      dispatch(logoutMerchant());
    }
    navigate('/');
  }, []);

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

MerchantLogout.propTypes = {
  merchant: PropTypes.object,
};

export default MerchantLogout;
