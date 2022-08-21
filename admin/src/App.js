import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Link,
} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles'; // v1.x
import { purple } from '@material-ui/core/colors';
import Dashboard from './components/pages/Dashboard';
import Members from './components/pages/Members';
import Reservation from './components/pages/Reservation';
import Support from './components/pages/Support';
import Offers from './components/pages/Offers';
import Campaigns from './components/pages/Campaigns';
import Reviews from './components/pages/Reviews';
import Subscription from './components/pages/Subscription';
import Layout from './components/layout/Layout';
import MembersLayout from './members_components/layout/Layout';
import Notification from './components/pages/Notification';
import CreateOffers from './components/pages/forms/CreateOffers';
import EditOffers from './components/pages/forms/EditOffers';
import CreateCampaigns from './components/pages/CreateCampaigns';
import Login from './members_components/pages/credentials/Login';
import Register from './members_components/pages/credentials/Register';
import ForgotPassword from './members_components/pages/credentials/ForgotPassword';
import ResetPassword from './members_components/pages/credentials/ResetPassword';
import AboutUs from './members_components/pages/AboutUs';
import LandingPage from './members_components/pages/LandingPage';
import Header from './members_components/layout/Header';
import Footer from './members_components/layout/Footer';
import Direct_map_view from './members_components/pages/Direct_map_view';
import HomePage from './members_components/pages/HomePage/HomePage';
import SearchedProperties from './members_components/pages/HomePage/SearchedProperties';
import HomeStayDetail from './members_components/pages/HomePage/HomeStayDetail';
import Profile from './members_components/pages/profile/Profile';
import Notification_member from './members_components/pages/Notification';
import Guest_Request_Reservation from './members_components/pages/Guest_Request_Reservation/Guest_Request_Reservation';
import Subscribe from './members_components/pages/Subscription/Subscribe';
import PaymentForm from './members_components/pages/Subscription/PaymentForm';
import Create_Profile from './members_components/pages/Create_Profile/Create_Profile';
import NotActiveModal from './members_components/pages/modal/NotActiveModal';
import PrivateRouting from './routing/PrivateRouting';
import PrivateRoute from './routing/PrivateRouting';
import { ProtectedRoute } from './members_components/ProtectedRoute';
import { useAuth } from './members_components/hooks/useAuth';
import TermsandConditions from './members_components/pages/TermsandConditions';
import PrivacyPolicy from './members_components/pages/PrivacyPolicy';
import ContactUs from './members_components/ContactUs';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe',
    },
    secondary: purple,
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App(props) {
  const isAuthenticated = localStorage.getItem('user-id');
  const [isAdmin, setIsAdmin] = useState(true);
  const [userData, setUserData] = useState(true);
  const [modelOpen, setModelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    console.log(
      'user-----------',
      JSON.parse(localStorage.getItem('user_data'))
    );
    let params = new URL(document.location).searchParams;
    let name = params.get('name');
    console.log('url-----------', params);

    setUserData(JSON.parse(localStorage.getItem('user_data')));

    if (JSON.parse(localStorage.getItem('user_data'))?.isAdmin == true) {
      setIsAdmin(true);
    }

    if (
      JSON.parse(localStorage.getItem('user_data'))?.isActive == false ||
      JSON.parse(localStorage.getItem('user_data'))?.isApproved == false
    ) {
      setModelOpen(true);
    }
  }, []);

  const openModal = () => setModelOpen(true);
  const closeModal = () => setModelOpen(false);

  console.log('Env---------------', process.env.REACT_APP_DEV_URL);
  const notApproved =
    JSON.parse(localStorage.getItem('user_data'))?.isApproved == false;
  const notActive =
    JSON.parse(localStorage.getItem('user_data'))?.isActive == false;
  console.log(notApproved);
  console.log(notActive);

  return (
    <div className="bgHom">
      {/* <ToastContainer hideProgressBar style={{ marginTop: '60px' }} /> */}
      <ThemeProvider theme={theme}>
        <Router>
          {/* {notApproved || notActive ? (
            // <div className="overlay">
            <NotActiveModal
              show={modelOpen}
              onHide={closeModal}
              approved={notApproved}
              active={notActive}
            />
          ) : // </div>
          null} */}
          {JSON.parse(localStorage.getItem('user_data'))?.isAdmin == true ? (
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/members" element={<Members />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/support" element={<Support />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route path="/Reviews" element={<Reviews />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/createOffe" element={<CreateOffers />} />
                <Route path="/editOffers" element={<EditOffers />} />
                <Route path="/createCampaigns" element={<CreateCampaigns />} />
              </Routes>
            </Layout>
          ) : (
            <>
              {/* <Header /> */}
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot_password" element={<ForgotPassword />} />
                <Route path="/reset/:token" element={<ResetPassword />} />

                <Route
                  path="/subscribe"
                  element={<Subscribe closeModal={closeModal} />}
                />
                <Route path="/payment" element={<PaymentForm />} />
                <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                <Route
                  path="/termsandconditions"
                  element={<TermsandConditions />}
                />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route
                  path="/contactus"
                  element={
                    // <ProtectedRoute>
                    <ContactUs />
                    // </ProtectedRoute>
                  }
                />
                <Route path="/create_profile" element={<Create_Profile />} />
              </Routes>

              <MembersLayout>
                <Routes>

                  <Route
                    path="/direct_map_view"
                    element={<Direct_map_view />}
                  />
                  <Route
                    path="/homepage"
                    element={
                      <ProtectedRoute>
                        <HomePage />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/searchedProperties"
                    element={
                      <ProtectedRoute>
                        <SearchedProperties />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/homeStayDetail"
                    element={
                      <ProtectedRoute>
                        <HomeStayDetail />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/userProfile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/notification"
                    element={<Notification_member />}
                  />
                  <Route
                    path="/Guest_Request_Reservation"
                    element={
                      <ProtectedRoute>
                        <Guest_Request_Reservation />
                      </ProtectedRoute>
                    }
                  />

                </Routes>
              </MembersLayout>

              {/*localStorage.getItem("user-id") != undefined && localStorage.getItem("user-id") != null  ? <Footer /> : null*/}
              <Footer />
            </>
          )}
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
