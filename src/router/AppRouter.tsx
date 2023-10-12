import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import { LoginPage } from '../auth/context/pages/LoginPage';
import { RouterPaths } from '../routes/RouterPaths.routes';
import { useContext } from 'react';
import { AuthContext } from '../auth/context/authContext';



export const AppRouter = () => {

  const { isLogged } = useContext(AuthContext);

  return (
    <>

      <Routes>
      <Route path="login" element={isLogged ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/*" element={
          <PrivateRoutes>
            <Routes>
              <Route path="/*" element={<RouterPaths />} />
            </Routes>
          </PrivateRoutes>
        } />
      </Routes>

    </>
  )
}
