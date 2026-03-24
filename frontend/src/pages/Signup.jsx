import { useState, useContext } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import AuthContext from '../context/AuthContext';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/api/auth/register', { 
                username, email, password 
            });
            login(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <Paper sx={{ p: 4, mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                Sign Up for TaskPlanet Social
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, padding: 1.5, borderRadius: 2 }}
                >
                    Sign Up
                </Button>
                <Box sx={{ textAlign: 'center' }}>
                    <Link to="/login" style={{ textDecoration: 'none', color: '#0f62fe' }}>
                        {"Already have an account? Sign In"}
                    </Link>
                </Box>
            </Box>
        </Paper>
    );
};

export default Signup;
