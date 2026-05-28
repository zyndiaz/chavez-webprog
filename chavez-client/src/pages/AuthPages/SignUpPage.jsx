import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { handleSignUp } from './Login';

const inputClasses = 'w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900';
const actionButtonClassName = 'w-full rounded-xl py-3 text-sm font-semibold tracking-wide';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        username: '',
        age: '',
        gender: 'male',
        contactNumber: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
        if (success) setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const result = await handleSignUp(formData);

        if (result.success) {
            setSuccess(result.message || 'Account created successfully!');
            // Redirect to Sign In page after 2 seconds
            setTimeout(() => {
                navigate('/auth/signin');
            }, 2000);
        } else {
            setError(result.message);
        }
        
        setLoading(false);
    };

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

                <div className="mt-8 bg-white px-6 py-8 shadow-sm rounded-2xl">
                    {error && (
                        <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-4 rounded-lg bg-green-50 p-4 text-sm text-green-800">
                            {success}
                        </div>
                    )}
                    
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700">
                                    First Name *
                                </label>
                                <input
                                    name="firstName"
                                    type="text"
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={inputClasses}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700">
                                    Last Name *
                                </label>
                                <input
                                    name="lastName"
                                    type="text"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={inputClasses}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700">
                                Email Address *
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className={inputClasses}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700">
                                Username
                            </label>
                            <input
                                name="username"
                                type="text"
                                placeholder="Optional - will be generated from email"
                                value={formData.username}
                                onChange={handleChange}
                                className={inputClasses}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700">
                                Password *
                            </label>
                            <input
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className={inputClasses}
                            />
                            <p className="mt-2 text-xs text-zinc-500">
                                Use 8+ characters with letters, numbers & symbols
                            </p>
                        </div>

                        <details className="cursor-pointer">
                            <summary className="text-sm font-medium text-zinc-700">
                                Additional Information (Optional)
                            </summary>
                            <div className="mt-4 space-y-4">
                                <input
                                    name="age"
                                    type="number"
                                    placeholder="Age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className={inputClasses}
                                />
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className={inputClasses}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                <input
                                    name="contactNumber"
                                    type="tel"
                                    placeholder="Contact Number"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    className={inputClasses}
                                />
                                <textarea
                                    name="address"
                                    rows="2"
                                    placeholder="Address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className={inputClasses}
                                />
                            </div>
                        </details>

                        <Button 
                            type="submit" 
                            variant="primary" 
                            className={actionButtonClassName}
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </Button>

                        <div className="text-center text-sm">
                            <span className="text-zinc-600">Already have an account? </span>
                            <Link to="/auth/signin" className="font-semibold text-zinc-900">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;