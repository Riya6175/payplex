import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AdminPanel from './components/admin/AdminPanel';
import UserPanel from './components/user/UserPanel';
import DynamicPage from './components/user/DynamicPage';
import store, { persistor } from './redux/store';
import { theme } from "./assets/styles/theme";
import { CssBaseline, AppBar, Toolbar, Typography, Button, Box, CircularProgress } from '@mui/material';
import { AdminPanelSettings as AdminIcon, Public as PublicIcon } from '@mui/icons-material';

const newTheme = createTheme(theme);

const AppContent = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine current view based on pathname
    const getCurrentView = () => {
        if (location.pathname.startsWith('/admin')) return 'admin';
        return 'page'; // for dynamic pages like /home1, /home2
    };

    const currentView = getCurrentView();

    return (
        <>
            <AppBar position="static" elevation={2}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Page Management System
                    </Typography>
                    <Button
                        color={currentView === 'admin' ? 'secondary' : 'inherit'}
                        onClick={() => navigate('/admin')}
                        startIcon={<AdminIcon />}
                        sx={{ mr: 1 }}
                    >
                        Admin Panel
                    </Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
                <Routes>
                    <Route path="/admin" element={<AdminPanel />} />
                    <Route path="/user" element={<UserPanel />} />
                    <Route path="/:route" element={<DynamicPage />} />
                    <Route path="/" element={<AdminPanel />} />
                </Routes>
            </Box>
        </>
    );
};

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate
                loading={
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                        <CircularProgress />
                    </Box>
                }
                persistor={persistor}
            >
                <ThemeProvider theme={newTheme}>
                    <CssBaseline />
                    <Router>
                        <AppContent />
                    </Router>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;