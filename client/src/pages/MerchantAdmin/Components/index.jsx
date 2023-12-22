import { FormattedMessage } from 'react-intl';
import MerchantProfile from './MerchantProfile';
import MerchantTransaction from './MerchantTransaction';
import MerchantVenue from './MerchantVenue';
import MerchantLogout from './MerchantLogout';

export const MerchantComponents = {
  profile: MerchantProfile,
  venue: MerchantVenue,
  transaction: MerchantTransaction,
  logout: MerchantLogout,
  default: () => (
    <div>
      <h1>
        <FormattedMessage id="app_popup_error_title" />
      </h1>
    </div>
  ),
};
