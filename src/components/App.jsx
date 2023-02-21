import 'react-toastify/dist/ReactToastify.css';
import { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { refreshUser } from 'redux/auth/auth.operations';
import { PrivateRoute } from './AuthRouts/PrivateRoute';
import { RestrictedRoute } from './AuthRouts/RestrictedRoute';
import { SharedLayout } from './SharedLayout/SharedLayout';
const Contacts = lazy(() => import('pages/Contacts/Contacts'));
const NewContact = lazy(() => import('pages/Contacts/NewContact'));
const Login = lazy(() => import('pages/Login/Login'));
const Register = lazy(() => import('pages/Register/Register'));
const Profile = lazy(() => import('pages/Profile/Profile'));

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      dispatch(refreshUser());
    } catch (error) {
      toast.error('Authorization error');
    }
  }, [dispatch]);

  return (
    <BrowserRouter basename="/phonebook">
      <SharedLayout>
        <Suspense fallback="">
          <Routes>
            <Route>
              {/* <Route path="/" element={<SharedLayout />}> */}
              <Route path="" element={<RestrictedRoute />}>
                <Route index element={<Login />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>
              <Route path="" element={<PrivateRoute />}>
                <Route path="contacts" element={<Contacts />} />
                <Route path="new-contact" element={<NewContact />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </SharedLayout>
      <ToastContainer />
    </BrowserRouter>
  );
};
