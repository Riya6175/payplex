import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Menu,
    MenuItem,
    Chip
} from '@mui/material';
import {
    AdminPanelSettings as AdminIcon,
    Public as PublicIcon,
    ExpandMore as ExpandIcon,
    Launch as LaunchIcon
} from '@mui/icons-material';
import { useSelector } from 'react-redux';

const Navigation = ({ currentView, onViewChange, onRouteNavigate }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const allPages = useSelector(state => state.pages?.pages || []);

    // Filter only active pages for navigation
    const activePages = allPages.filter(page => page.isActive);

    const handleRoutesMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleRoutesMenuClose = () => {
        setAnchorEl(null);
    };

    const handleRouteClick = (route) => {
        if (onRouteNavigate) {
            onRouteNavigate(route);
        } else {
            // Default behavior - you can modify this based on your routing setup
            window.open(`/${route}`, '_blank');
        }
        handleRoutesMenuClose();
    };

    return (
        <AppBar position="static" elevation={2}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Page Management System
                </Typography>

                {/* Routes Dropdown */}
                {activePages.length > 0 && (
                    <>
                        <Button
                            color="inherit"
                            onClick={handleRoutesMenuOpen}
                            endIcon={<ExpandIcon />}
                            sx={{ mr: 2 }}
                        >
                            Routes ({activePages.length})
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleRoutesMenuClose}
                            PaperProps={{
                                sx: { maxWidth: 300, minWidth: 250 }
                            }}
                        >
                            <Typography
                                variant="subtitle2"
                                sx={{ px: 2, py: 1, color: 'text.secondary' }}
                            >
                                Active Pages
                            </Typography>
                            {activePages.map((page) => (
                                <MenuItem
                                    key={page.id}
                                    onClick={() => handleRouteClick(page.route)}
                                    sx={{ flexDirection: 'column', alignItems: 'flex-start', py: 1.5 }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                        <Typography variant="body2" sx={{ fontWeight: 'medium', flexGrow: 1 }}>
                                            /{page.route}
                                        </Typography>
                                        <LaunchIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                    </div>
                                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                                        {page.header}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </>
                )}

                <Button
                    color={currentView === 'admin' ? 'secondary' : 'inherit'}
                    onClick={() => onViewChange('admin')}
                    startIcon={<AdminIcon />}
                    sx={{ mr: 1 }}
                >
                    Admin Panel
                </Button>
                <Button
                    color={currentView === 'user' ? 'secondary' : 'inherit'}
                    onClick={() => onViewChange('user')}
                    startIcon={<PublicIcon />}
                >
                    User View
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navigation;