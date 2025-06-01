import React from 'react';
import {
    Typography,
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Box,
    Avatar,
} from '@mui/material';
import store from "../../redux/store";
 const UserPanel = () => {
    const [pages, setPages] = React.useState(() =>
        store.getState().pages.pages.filter(page => page.isActive)
    );

    React.useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setPages(store.getState().pages.pages.filter(page => page.isActive));
        });
        return unsubscribe;
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {pages.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h5" color="text.secondary" gutterBottom>
                        No Active Pages
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        There are currently no active pages to display.
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={4}>
                    {pages.map((page) => (
                        <Grid item xs={12} key={page.id}>
                            <Card elevation={4}>
                                {/* Header */}
                                <Box sx={{
                                    background: 'linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)',
                                    p: 2,
                                    color: 'white'
                                }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Avatar
                                            src={page.logo}
                                            variant="square"
                                            sx={{ width: 80, height: 40, bgcolor: 'white', p: 1 }}
                                        />
                                        <Box sx={{ textAlign: 'right' }}>
                                            <Typography variant="h6">{page.contact}</Typography>
                                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                                {page.mailId}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Banner */}
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={page.bannerImage}
                                    alt="Banner"
                                />

                                {/* Banner Overlay */}
                                <Box sx={{
                                    position: 'relative',
                                    mt: -8,
                                    mb: 2,
                                    textAlign: 'center',
                                    bgcolor: 'rgba(0,0,0,0.5)',
                                    color: 'white',
                                    py: 2
                                }}>
                                    <Typography variant="h4" component="h1" fontWeight="bold">
                                        {page.header}
                                    </Typography>
                                </Box>

                                {/* Content */}
                                <CardContent>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={8}>
                                            <Typography variant="h6" gutterBottom color="primary">
                                                About {page.route.charAt(0).toUpperCase() + page.route.slice(1)}
                                            </Typography>
                                            <Typography variant="body1" paragraph>
                                                {page.text}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Typography variant="h6" gutterBottom color="primary">
                                                Contact Information
                                            </Typography>
                                            <Box sx={{ space: 2 }}>
                                                <Typography variant="body2" gutterBottom>
                                                    <strong>Address:</strong>
                                                </Typography>
                                                <Typography variant="body2" paragraph sx={{ ml: 2 }}>
                                                    {page.address}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <strong>Phone:</strong> {page.contact}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <strong>Email:</strong> {page.mailId}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

 export default UserPanel;