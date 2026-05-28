import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { isAuthenticated, isAdmin } from './pages/AuthPages/Login';

import Layout from './layouts/Layout';
import AuthLayout from './layouts/AuthLayout';
import DashLayout from './layouts/DashLayout';

import HomePage from './pages/LandingPages/HomePage';
import AboutPage from './pages/LandingPages/AboutPage';
import ArticleListPage from './pages/LandingPages/ArticleListPage';
import ArticlePage from './pages/LandingPages/ArticlePage';

import SignInPage from './pages/AuthPages/SignInPage';
import SignUpPage from './pages/AuthPages/SignUpPage';

import DashboardPage from './pages/DashboardPages/DashboardPage';
import ReportsPage from './pages/DashboardPages/ReportsPage';
import UsersPage from './pages/DashboardPages/UsersPage';
import DashArticleListPage from './pages/DashboardPages/DashArticleListPage';

import NotFoundPage from './pages/NotFoundPage';
import UnauthorizedPage from './pages/UnauthorizedPage';

// DashboardGuard - checks for viewer and redirects
const DashboardGuard = ({ children }) => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('type');
    
    console.log('DashboardGuard - Token:', token, 'UserType:', userType); // Debug log
    
    // If no token, redirect to login
    if (!token) {
        console.log('No token, redirecting to login');
        return <Navigate to="/auth/signin" replace />;
    }
    
    // If viewer, clear storage and redirect to home
    if (userType === 'viewer') {
        console.log('Viewer detected, clearing storage and redirecting to home');
        localStorage.clear();
        return <Navigate to="/" replace />;
    }
    
    // If admin or editor, allow access
    if (userType === 'admin' || userType === 'editor') {
        console.log('Valid user, allowing access');
        return children;
    }
    
    // Default redirect to login
    console.log('Invalid user type, redirecting to login');
    return <Navigate to="/auth/signin" replace />;
};

const AdminGuard = ({ children }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/auth/signin" replace />;
    }
    
    const userType = localStorage.getItem('type');
    
    if (userType !== 'admin') {
        return <Navigate to="/dashboard/unauthorized" replace />;
    }
    
    return children;
};

const AuthGuard = ({ children }) => {
    if (isAuthenticated()) {
        return <Navigate to="/dashboard" replace />;
    }
    return children;
};

const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'about',
                element: <AboutPage />,
            },
            {
                path: 'articles',
                element: <ArticleListPage />,
            },
            {
                path: '/article/:name',
                element: <ArticlePage />
            }
        ],
    },
    
    {
        path: "auth",
        element: <AuthLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: "signin",
                element: (
                    <AuthGuard>
                        <SignInPage />
                    </AuthGuard>
                ),
            },
            {
                path: "signup",
                element: (
                    <AuthGuard>
                        <SignUpPage />
                    </AuthGuard>
                ),
            }
        ],
    },
    
    {
        path: "/dashboard",
        element: (
            <DashboardGuard>
                <DashLayout />
            </DashboardGuard>
        ),
        children: [
            {
                index: true,
                element: <DashboardPage />,
            },
            {
                path: "reports",
                element: <ReportsPage />,
            },
            {
                path: "articles",
                element: <DashArticleListPage />,
            },
            {
                path: "users",
                element: (
                    <AdminGuard>
                        <UsersPage />
                    </AdminGuard>
                ),
            },
            {
                path: "unauthorized",
                element: <UnauthorizedPage />,
            }
        ],
    },
    
    {
        path: "*",
        element: <NotFoundPage />,
    },
];

const router = createBrowserRouter(routes);

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;