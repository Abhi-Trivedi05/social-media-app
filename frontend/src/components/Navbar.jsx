import { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PublicIcon from '@mui/icons-material/Public';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return null;

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* Top App Bar */}
            <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'white' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        Social
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button variant="outlined" sx={{ borderRadius: 5, textTransform: 'none' }}>
                            50 ⭐ | ₹0.00
                        </Button>
                        <IconButton>
                            <Avatar src={user.avatar} sx={{ width: 32, height: 32 }} />
                        </IconButton>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Bottom Navigation matching TaskPlanet */}
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                <Toolbar sx={{ justifyContent: 'space-around' }}>
                    <IconButton color="inherit"><HomeIcon /></IconButton>
                    <IconButton color="inherit"><AssessmentIcon /></IconButton>
                    <IconButton 
                        color="inherit" 
                        sx={{ 
                            transform: 'translateY(-20px)', 
                            bgcolor: 'white', 
                            color: 'primary.main',
                            boxShadow: 2,
                            p: 2,
                            '&:hover': { bgcolor: '#f0f0f0' }
                        }}
                    >
                        <PublicIcon fontSize="large" />
                    </IconButton>
                    <IconButton color="inherit"><EmojiEventsIcon /></IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
