import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    TextField,
    FormControlLabel,
    Switch,
    Button,
    Alert,
} from '@mui/material';
import { FileUpload } from './FileUpload'; // assuming you have a FileUpload component
import SaveIcon from '@mui/icons-material/Save';
export const PageFormDialog = ({ open, onClose, page, onSave }) => {
    const [formData, setFormData] = useState({
        logo: '',
        mailId: '',
        contact: '',
        bannerImage: '',
        header: '',
        text: '',
        address: '',
        route: '',
        isActive: true,
        ...page
    });

    const [errors, setErrors] = useState({});

    const handleChange = (field) => (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleFileSelect = (field) => (dataUrl) => {
        setFormData(prev => ({
            ...prev,
            [field]: dataUrl
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.logo) newErrors.logo = 'Logo is required';
        if (!formData.mailId) newErrors.mailId = 'Email is required';
        if (!formData.contact) newErrors.contact = 'Contact is required';
        if (!formData.bannerImage) newErrors.bannerImage = 'Banner image is required';
        if (!formData.header) newErrors.header = 'Header is required';
        if (!formData.text) newErrors.text = 'Text content is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.route) newErrors.route = 'Route is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validate()) {
            onSave(formData);
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                {'Create New Page'}
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} md={6}>
                        <FileUpload
                            onFileSelect={handleFileSelect('logo')}
                            accept="image/*"
                            label="Logo"
                            currentFile={formData.logo}
                        />
                        {errors.logo && <Alert severity="error" sx={{ mt: 1 }}>{errors.logo}</Alert>}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Email ID"
                            type="email"
                            value={formData.mailId}
                            onChange={handleChange('mailId')}
                            error={!!errors.mailId}
                            helperText={errors.mailId}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Contact Number"
                            value={formData.contact}
                            onChange={handleChange('contact')}
                            error={!!errors.contact}
                            helperText={errors.contact}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Route"
                            placeholder="e.g., home1, home2"
                            value={formData.route}
                            onChange={handleChange('route')}
                            error={!!errors.route}
                            helperText={errors.route}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FileUpload
                            onFileSelect={handleFileSelect('bannerImage')}
                            accept="image/*"
                            label="Banner Image"
                            currentFile={formData.bannerImage}
                        />
                        {errors.bannerImage && <Alert severity="error" sx={{ mt: 1 }}>{errors.bannerImage}</Alert>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Header"
                            value={formData.header}
                            onChange={handleChange('header')}
                            error={!!errors.header}
                            helperText={errors.header}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Text Content"
                            multiline
                            rows={4}
                            value={formData.text}
                            onChange={handleChange('text')}
                            error={!!errors.text}
                            helperText={errors.text}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Address"
                            multiline
                            rows={2}
                            value={formData.address}
                            onChange={handleChange('address')}
                            error={!!errors.address}
                            helperText={errors.address}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.isActive}
                                    onChange={handleChange('isActive')}
                                />
                            }
                            label="Active Status"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    startIcon={<SaveIcon />}
                >
                    Save Page
                </Button>
            </DialogActions>
        </Dialog>
    );
};