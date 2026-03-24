import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Feed from './pages/Feed';
import Navbar from './components/Navbar';
import { Box } from '@mui/material';

function App() {
    const { user, loading } = useContext(AuthContext);

    if (loading) return null;

    return (
        <Box sx={{ pb: 7 }}>
            <Navbar />
            <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
                <Routes>
                    <Route 
                        path="/" 
                        element={user ? <Feed /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/login" 
                        element={!user ? <Login /> : <Navigate to="/" />} 
                    />
                    <Route 
                        path="/signup" 
                        element={!user ? <Signup /> : <Navigate to="/" />} 
                    />
                </Routes>
            </Box>
        </Box>
    );
}

export default App;
