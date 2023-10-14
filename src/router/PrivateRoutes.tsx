import { ReactNode } from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../auth/context/authContext';

const PrivateRoutes = ({ children }: {children:ReactNode}) => {

  const { isLogged } = useContext(AuthContext);

  return isLogged ? children : <Navigate to={"/login"} />
}

export default PrivateRoutes