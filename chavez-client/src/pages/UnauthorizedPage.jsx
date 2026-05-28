import { useNavigate } from 'react-router-dom';
import { getCurrentUser, handleLogout } from './AuthPages/Login';

const UnauthorizedPage = () => {
    const navigate = useNavigate();
    const user = getCurrentUser();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
            <div className="text-center">
                <div className="mb-6">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
                        <svg
                            className="h-12 w-12 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-3V9m0 0V7m0 0h2m-2 0H9M12 3a9 9 0 100 18 9 9 0 000-18z"
                            />
                        </svg>
                    </div>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-2">Access Denied</h1>
                <p className="text-lg text-gray-600 mb-4">403 - Unauthorized Access</p>
                
                <div className="max-w-md mx-auto">
                    {user?.type === 'editor' ? (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                            <p className="text-yellow-800">
                                <span className="font-semibold"> Editor Access Only</span>
                                <br />
                                You have editor privileges. The Users Management page is restricted to administrators only.
                                <br />
                                <br />
                                Please contact an administrator if you need access to user management features.
                            </p>
                        </div>
                    ) : (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                            <p className="text-red-800">
                                You don't have permission to access this page.
                                <br />
                                This area is restricted to administrators only.
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="rounded-lg bg-gray-900 px-6 py-2 text-white hover:bg-gray-700 transition-colors"
                    >
                        Back to Dashboard
                    </button>
                    <button
                        onClick={handleLogout}
                        className="rounded-lg border border-gray-300 bg-white px-6 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UnauthorizedPage;