import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { LanguageProvider } from '@/lib/LanguageContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { Navigate } from 'react-router-dom';
import SiteLayout from './components/layout/SiteLayout';
import CookieBanner from './components/CookieBanner';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Booking from './pages/Booking';
import Empleo from './pages/Empleo';
import AdminBookings from './pages/AdminBookings';
import LeaveReview from './pages/LeaveReview';
import AdminReviews from './pages/AdminReviews';
import Promotions from './pages/Promotions';
import PrivacyPolicy from './pages/PrivacyPolicy';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/Services" element={<Services />} />
        <Route path="/About" element={<About />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path="/Empleo" element={<Empleo />} />
        <Route path="/AdminBookings" element={<AdminBookings />} />
        <Route path="/Promotions" element={<Promotions />} />
      </Route>
      <Route path="/LeaveReview" element={<LeaveReview />} />
      <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
      <Route path="/AdminReviews" element={<AdminReviews />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <LanguageProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <AuthenticatedApp />
            <CookieBanner />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </LanguageProvider>
  )
}

export default App