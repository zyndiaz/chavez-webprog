import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses = 'w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900';

const actionButtonClassName = 'w-full rounded-xl py-3 text-sm font-semibold tracking-wide';

const SignInPage = () => {
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

                <div className="mt-8 bg-white px-6 py-8 shadow-sm rounded-2xl sm:rounded-2xl sm:px-10">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="signin-email" className="block text-sm font-medium text-zinc-700">
                                Email Address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="signin-email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="you@example.com"
                                    className={inputClasses}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="signin-password" className="block text-sm font-medium text-zinc-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="signin-password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    placeholder="••••••••"
                                    className={inputClasses}
                                />
                            </div>
                            <p className="mt-2 text-xs text-zinc-500">
                                Must be at least 8 characters with letters, numbers & symbols
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm text-zinc-600">
                                <input 
                                    type="checkbox" 
                                    className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                                />
                                <span>Remember me</span>
                            </label>
                            <button 
                                type="button" 
                                className="text-sm font-medium text-zinc-700 transition hover:text-zinc-900"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <Button 
                            type="submit" 
                            variant="primary" 
                            className={actionButtonClassName}
                        >
                            Sign In
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-zinc-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-zinc-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid gap-3">
                            <Button 
                                type="button" 
                                variant="secondary" 
                                className={actionButtonClassName}
                            >
                                Google
                            </Button>
                            <Button 
                                type="button" 
                                variant="secondary" 
                                className={actionButtonClassName}
                            >
                                Apple
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-zinc-600">Don't have an account? </span>
                        <Link 
                            to="/auth/signup" 
                            className="font-semibold text-zinc-900 transition hover:text-zinc-600"
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;