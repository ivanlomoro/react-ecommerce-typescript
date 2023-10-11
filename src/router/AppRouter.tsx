import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import { LoginPage } from '../auth/context/pages/LoginPage';
import { RouterPaths } from '../routes/RouterPaths.routes';



export const AppRouter = () => {
  return (
    <>

      <Routes>
        <Route path="login" element={<LoginPage />} />
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
