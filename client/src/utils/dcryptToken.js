import { jwtDecode } from 'jwt-decode';

const dcryptToken = (token) => jwtDecode(token);
export default dcryptToken;
