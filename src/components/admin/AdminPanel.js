import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Plus } from 'lucide-react';
import { addPage, deletePage, toggleStatus } from '../../redux/slices/PageSlice';
import { PageFormDialog } from './PageForm';
import PageTable from './PageTable';

const AdminPanel = () => {
    const dispatch = useDispatch();
    const allPages = useSelector(state => state.pages?.pages || []);
    const [showForm, setShowForm] = useState(false);
    const [editingPage, setEditingPage] = useState(null);

    const handleSave = (pageData) => {
        dispatch(addPage(pageData));
        setShowForm(false);
        setEditingPage(null);
    };

    const handleDelete = (id) => {
        dispatch(deletePage(id));
    };

    const handleToggleStatus = (id) => {
        dispatch(toggleStatus(id));
    };

    const handleCreateNew = () => {
        setEditingPage(null); // Clear any existing edit data
        setShowForm(true);    // Show the form
    };
    const handleRouteNavigate = (route) => {
        // Same tab navigation instead of new tab
        window.location.href = `/${route}`;
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Page Management</h1>
                        <p className="text-gray-600 mt-1">Manage your website pages and content</p>
                    </div>
                    <button
                        onClick={handleCreateNew}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center shadow-sm"
                    >
                        <Plus size={16} className="mr-2" />
                        Create New Page
                    </button>
                </div>

                {/* Page Table */}
                <PageTable
                    pages={allPages}
                    onDelete={handleDelete}
                    onToggleStatus={handleToggleStatus}
                    onRouteNavigate={handleRouteNavigate}
                />

                {/* Form Modal */}
                <PageFormDialog
                    open={showForm}
                    page={editingPage}
                    onSave={handleSave}
                    onClose={() => {
                        setShowForm(false);
                        setEditingPage(null);
                    }}
                />
            </div>
        </div>
    );
};

export default AdminPanel;