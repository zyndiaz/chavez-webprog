import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { handleSignIn } from './Login';

const inputClasses = 'w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900';
const actionButtonClassName = 'w-full rounded-xl py-3 text-sm font-semibold tracking-wide';

const SignInPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    // Load remembered email
    useEffect(() => {
        const remembered = localStorage.getItem('rememberedEmail');
        if (remembered) {
            setEmail(remembered);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Call the Login.js function
        const result = await handleSignIn(email, password);

        if (result.success) {
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }
            navigate('/dashboard');
        } else {
            setError(result.message);
            
            // If it's a viewer account, redirect to home after 2 seconds
            if (result.isViewer || result.redirectToHome) {
                setTimeout(() => {
                    // Clear any stored data
                    localStorage.removeItem('token');
                    localStorage.removeItem('firstName');
                    localStorage.removeItem('type');
                    localStorage.removeItem('email');
                    navigate('/');
                }, 2000);
            }
        }
        
        setLoading(false);
    };

    return (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                        Welcome Back
                    </h2>
                    <p className="mt-3 text-sm text-zinc-600">
                        Sign in to your account to continue
                    </p>
                </div>

                <div className="mt-8 bg-white px-6 py-8 shadow-sm rounded-2xl">
                    {error && (
                        <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800">
                            {error}
                            {error.includes('Viewer') && (
                                <div className="mt-2 text-xs text-red-600">
                                    Redirecting you to the homepage...
                                </div>
                            )}
                        </div>
                    )}
                    
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-zinc-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={inputClasses}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={inputClasses}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm text-zinc-600">
                                <input 
                                    type="checkbox" 
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 rounded"
                                />
                                <span>Remember me</span>
                            </label>
                            <button type="button" className="text-sm font-medium text-zinc-700">
                                Forgot password?
                            </button>
                        </div>

                        <Button 
                            type="submit" 
                            variant="primary" 
                            className={actionButtonClassName}
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>

                        <div className="text-center text-sm">
                            <span className="text-zinc-600">Don't have an account? </span>
                            <Link to="/auth/signup" className="font-semibold text-zinc-900">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;