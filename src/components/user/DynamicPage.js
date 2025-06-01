import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Typography, Container, Paper } from '@mui/material';

const DynamicPage = () => {
    const { route } = useParams();
    const pages = useSelector(state => state.pages?.pages || []);

    const currentPage = pages.find(page => page.route === route && page.isActive);

    if (!currentPage) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h4" color="error" gutterBottom>
                        Page Not Found
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        The page "{route}" could not be found or is not active.
                    </Typography>
                </Paper>
            </Container>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh' }}>
            {/* Header with Logo */}
            {currentPage.logo && (
                <Box sx={{ p: 2, textAlign: 'center', bgcolor: 'background.paper' }}>
                    <img
                        src={currentPage.logo}
                        alt="Logo"
                        style={{ maxHeight: '80px', objectFit: 'contain' }}
                    />
                </Box>
            )}

            {/* Banner Image */}
            {currentPage.bannerImage && (
                <Box sx={{ width: '100%', height: '300px', overflow: 'hidden' }}>
                    <img
                        src={currentPage.bannerImage}
                        alt="Banner"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </Box>
            )}

            {/* Main Content */}
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Paper sx={{ p: 4 }}>
                    {/* Header */}
                    <Typography variant="h2" component="h1" gutterBottom sx={{ mb: 3 }}>
                        {currentPage.header}
                    </Typography>

                    {/* Text Content */}
                    <Typography
                        variant="body1"
                        paragraph
                        sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 4 }}
                    >
                        {currentPage.text}
                    </Typography>

                    {/* Contact Information */}
                    <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
                        <Typography variant="h5" gutterBottom>
                            Contact Information
                        </Typography>

                        {currentPage.address && (
                            <Typography variant="body1" paragraph>
                                <strong>Address:</strong><br />
                                {currentPage.address}
                            </Typography>
                        )}

                        {currentPage.contact && (
                            <Typography variant="body1" paragraph>
                                <strong>Phone:</strong> {currentPage.contact}
                            </Typography>
                        )}

                        {currentPage.mailId && (
                            <Typography variant="body1" paragraph>
                                <strong>Email:</strong> {currentPage.mailId}
                            </Typography>
                        )}
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default DynamicPage;