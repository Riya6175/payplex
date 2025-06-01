import {createSlice} from "@reduxjs/toolkit";

const PageSlice = createSlice({
    name: 'pages',
    initialState: {
        pages: [
            {
                id: 1,
                logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMTAwIDUwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNTAiIGZpbGw9IiMxOTc2ZDIiLz48dGV4dCB4PSI1MCIgeT0iMzAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0Ij5Mb2dvMTwvdGV4dD48L3N2Zz4=',
                mailId: 'admin@home1.com',
                contact: '+1234567890',
                bannerImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDgwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkMSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxOTc2ZDIiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM5YzI3YjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNncmFkMSkiLz48dGV4dCB4PSI0MDAiIHk9IjEwNSIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSJib2xkIj5Ib21lMSBCYW5uZXI8L3RleHQ+PC9zdmc+',
                header: 'Welcome to Home1',
                text: 'This is the main content for Home1 page with detailed information about our services and offerings.',
                address: '123 Main St, City, State 12345',
                route: 'home1',
                isActive: true,
                createdAt: '2024-01-01T10:00:00Z'
            },
            {
                id: 2,
                logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMTAwIDUwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNTAiIGZpbGw9IiNkYzAwNGUiLz48dGV4dCB4PSI1MCIgeT0iMzAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0Ij5Mb2dvMjwvdGV4dD48L3N2Zz4=',
                mailId: 'admin@home2.com',
                contact: '+0987654321',
                bannerImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDgwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkMiIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNkYzAwNGUiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmZjU3MjIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNncmFkMikiLz48dGV4dCB4PSI0MDAiIHk9IjEwNSIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSJib2xkIj5Ib21lMiBCYW5uZXI8L3RleHQ+PC9zdmc+',
                header: 'Welcome to Home2',
                text: 'This is the main content for Home2 page with comprehensive details about our innovative solutions.',
                address: '456 Oak Ave, Town, State 67890',
                route: 'home2',
                isActive: false,
                createdAt: '2024-01-02T11:00:00Z'
            }
        ],
        loading: false,
        error: null
    },
    reducers: {
        addPage: (state, action) => {
            state.pages.push({
                ...action.payload,
                id: Date.now(),
                createdAt: new Date().toISOString()
            });
        },
        updatePage: (state, action) => {
            const index = state.pages.findIndex(page => page.id === action.payload.id);
            if (index !== -1) {
                state.pages[index] = action.payload;
            }
        },
        deletePage: (state, action) => {
            state.pages = state.pages.filter(page => page.id !== action.payload);
        },
        toggleStatus: (state, action) => {
            const page = state.pages.find(page => page.id === action.payload);
            if (page) {
                page.isActive = !page.isActive;
            }
        }
    }
});

// Export actions as named exports
export const { addPage, updatePage, deletePage, toggleStatus } = PageSlice.actions;

// Export reducer as default export
export default PageSlice.reducer;