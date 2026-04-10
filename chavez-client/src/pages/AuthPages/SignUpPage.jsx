import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses = 'w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900';

const actionButtonClassName = 'w-full rounded-xl py-3 text-sm font-semibold tracking-wide';

const SignUpPage = () => {
    return (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                        Create an Account
                    </h2>
                    <p className="mt-3 text-sm text-zinc-600">
                        Join us today and get started
                    </p>
                </div>

                <div className="mt-8 bg-white px-6 py-8 shadow-sm rounded-2xl sm:rounded-2xl sm:px-10">
                    <form className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="first-name" className="block text-sm font-medium text-zinc-700">
                                    First Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="first-name"
                                        name="firstName"
                                        type="text"
                                        autoComplete="given-name"
                                        placeholder="John"
                                        className={inputClasses}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="last-name" className="block text-sm font-medium text-zinc-700">
                                    Last Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="last-name"
                                        name="lastName"
                                        type="text"
                                        autoComplete="family-name"
                                        placeholder="Doe"
                                        className={inputClasses}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="signup-email" className="block text-sm font-medium text-zinc-700">
                                Email Address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="signup-email"
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
                            <label htmlFor="signup-password" className="block text-sm font-medium text-zinc-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="signup-password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    placeholder="Create a strong password"
                                    className={inputClasses}
                                />
                            </div>
                            <p className="mt-2 text-xs text-zinc-500">
                                Use 8+ characters with letters, numbers & symbols
                            </p>
                        </div>

                        <Button 
                            type="submit" 
                            variant="primary" 
                            className={actionButtonClassName}
                        >
                            Sign Up
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-zinc-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-zinc-500">Or sign up with</span>
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
                        <span className="text-zinc-600">Already have an account? </span>
                        <Link 
                            to="/auth/signin" 
                            className="font-semibold text-zinc-900 transition hover:text-zinc-600"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;