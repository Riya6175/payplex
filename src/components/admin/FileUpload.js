import React, { useState } from 'react';
import {
    Box,
    Button,
} from '@mui/material';
import {UploadIcon} from "lucide-react";

export const FileUpload = ({ onFileSelect, accept, label, currentFile }) => {
    const [preview, setPreview] = useState(currentFile || null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const dataUrl = e.target.result;
                setPreview(dataUrl);
                onFileSelect(dataUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box>
            <input
                accept={accept}
                style={{ display: 'none' }}
                id={`file-upload-${label}`}
                type="file"
                onChange={handleFileChange}
            />
            <label htmlFor={`file-upload-${label}`}>
                <Button
                    variant="outlined"
                    component="span"
                    startIcon={<UploadIcon />}
                    fullWidth
                    sx={{ mb: 1 }}
                >
                    Upload {label}
                </Button>
            </label>
            {preview && (
                <Box sx={{ mt: 1 }}>
                    <img
                        src={preview}
                        alt={`${label} preview`}
                        style={{
                            maxWidth: '100%',
                            maxHeight: label === 'Logo' ? '60px' : '120px',
                            objectFit: 'contain',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            padding: '4px'
                        }}
                    />
                </Box>
            )}
        </Box>
    );
};