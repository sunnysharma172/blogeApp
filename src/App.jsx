import React from 'react';
import './App.css';
import { Footer, Header } from './components';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthStore from './store/authStore';
import Signup from './pages/Signup';
import Login from './pages/login';

// Placeholder components for missing pages
const Home = () => <div>Home Page</div>;
const Blogs = () => <div>Blogs Page</div>;
const Contact = () => <div>Contact Page</div>;
const NoPage = () => <div>404 Not Found</div>;
const Layout = () => (
  <div>
    <Header />
    <Outlet />
    <Footer />
  </div>
);

function App() {
  const { userData } = useAuthStore();
  const location = useLocation();

  // Allow access to /signup even if not authenticated
  if (!userData && location.pathname !== '/signup' && location.pathname !== '/login') {
    return <Navigate to="/signup" replace />;
  }else{
    <Navigate to="/" replace />
  }

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
