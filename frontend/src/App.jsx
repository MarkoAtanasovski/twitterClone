import { Routes,Route } from "react-router-dom"

import HomePage from "./pages/home/HomePage"
import LoginPage from "./pages/auth/login/LoginPage"
import SignUpPage from "./pages/auth/signup/SignUpPage"
import NotificationPage from "./pages/notification/NotificationPage"
import ProfilePage from "./pages/profile/ProfilePage"

import Sidebar from "./components/common/Sidebar"
import RightPanel from "./components/common/RightPanel"

import {Toaster} from 'react-hot-toast';
import { useQuery } from "@tanstack/react-query"
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./components/common/LoadingSpinner"
function App() {
  const{ data:authUser,isLoading}=useQuery({
    // unique identifier for the query 
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/auth/me', {
          method: 'GET',
          credentials: 'include',
        });
    
        // Handle HTTP errors
        if (!res.ok) {
          console.error('Failed to fetch user, status:', res.status);
    
          // Attempt to parse the error response
          const errorData = await res.json().catch(() => ({}));
          if (errorData?.error) {
            console.error('Error response:', errorData);
            return null; // Return null if unauthorized
          }
          throw new Error('Failed to fetch authenticated user');
        }
    
        // Parse successful response
        const data = await res.json();
        console.log('Authenticated user fetched:', data);
        return data;
      } catch (error) {
        console.error('Error in fetchAuthUser:', error.message);
        return null; // Return null on fetch failure
      }
    },
    
    retry: false,
  });

  console.log(authUser)
  if(isLoading){
    return(
      <div className = 'h-screen flex justify-center items-center'>
      <LoadingSpinner size = 'lg' />
      </div>
    )
  }
  

  return (
    <div className='flex max-w-6xl mx-auto'>
    
        {/* Common Component, because it is not wrapped with Routes */}
      {authUser && <Sidebar />}
      <Routes>  
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to ='/login' /> } />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to = '/' /> }/>
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to = '/' />} />
        <Route path="/notifications" element={authUser ? <NotificationPage /> : <Navigate to ='/login' />} />
        <Route path="/profile/:username" element={authUser ? <ProfilePage /> : <Navigate to ='/login' />} />

      </Routes>
      {authUser && <RightPanel/>}
      <Toaster />
    </div>
  )
}

export default App