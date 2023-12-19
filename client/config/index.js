import development from '@config/development';
import production from '@config/production';

const nodeENV = process.env.NODE_ENV || 'development';

const env = { production, development }[nodeENV];

const config = {
  api: {
    host: env.API_HOST,
  },
  token: {
    tokenCrypto: env.TOKEN_CRYPTO,
    tokenCryptoForgotPassword: env.TOKEN_CRYPYO_FORGOT_PASSWORD,
  },
  snapClient: {
    snapKey: env.SNAP_CLIENT,
  },
};

export default config;
