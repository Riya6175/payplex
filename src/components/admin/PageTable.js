import React from 'react';
import { Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react';

const PageTable = ({
                       pages,
                       onDelete,
                       onToggleStatus,
                       onRouteNavigate // New prop for route navigation
                   }) => {
    const handleDelete = (id, pageName) => {
        if (window.confirm(`Are you sure you want to delete the page "${pageName}"?`)) {
            onDelete(id);
        }
    };

    const handleRouteClick = (route) => {
        if (onRouteNavigate) {
            onRouteNavigate(route);
        } else {
            // Default behavior - open in new tab
            window.open(`/${route}`, '_blank');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Logo
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Route
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Header
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact Info
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Created
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {pages.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                                <div className="flex flex-col items-center">
                                    <p className="text-lg font-medium">No pages found</p>
                                    <p className="text-sm mt-1">Create your first page to get started</p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        pages.map((page) => (
                            <tr key={page.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <img
                                            src={page.logo}
                                            alt={`${page.route} logo`}
                                            className="h-8 w-16 object-contain rounded border border-gray-200"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/100x50/E5E7EB/9CA3AF?text=Logo';
                                            }}
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleRouteClick(page.route)}
                                            className={`text-sm font-medium transition-colors inline-flex items-center space-x-1 ${
                                                page.isActive
                                                    ? 'text-blue-600 hover:text-blue-800 hover:underline cursor-pointer'
                                                    : 'text-gray-400 cursor-not-allowed'
                                            }`}
                                            disabled={!page.isActive}
                                            title={page.isActive ? `Visit /${page.route}` : 'Page is inactive'}
                                        >
                                            <span>/{page.route}</span>
                                            {page.isActive && <ExternalLink size={12} />}
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900 max-w-xs truncate" title={page.header}>
                                        {page.header}
                                    </div>
                                    <div className="text-xs text-gray-500 max-w-xs truncate mt-1" title={page.text}>
                                        {page.text}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{page.contact}</div>
                                    <div className="text-xs text-gray-500">{page.mailId}</div>
                                    <div className="text-xs text-gray-400 mt-1 max-w-xs truncate" title={page.address}>
                                        {page.address}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(page.createdAt)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => onToggleStatus(page.id)}
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                            page.isActive
                                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                                        }`}
                                        title={`Click to ${page.isActive ? 'deactivate' : 'activate'} this page`}
                                    >
                                        {page.isActive ? (
                                            <>
                                                <Eye size={12} className="mr-1" />
                                                Active
                                            </>
                                        ) : (
                                            <>
                                                <EyeOff size={12} className="mr-1" />
                                                Inactive
                                            </>
                                        )}
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleDelete(page.id, page.header)}
                                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                                            title="Delete page"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            {/* Table Footer with summary */}
            {pages.length > 0 && (
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>
                            Total: {pages.length} page{pages.length !== 1 ? 's' : ''}
                        </span>
                        <span>
                            Active: {pages.filter(p => p.isActive).length} |
                            Inactive: {pages.filter(p => !p.isActive).length}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PageTable;