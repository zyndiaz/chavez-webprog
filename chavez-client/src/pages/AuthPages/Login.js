import { loginUser, createUser } from '../../services/UserService';

export const handleSignIn = async (email, password) => {
    try {
        const response = await loginUser({ email, password });
        
        // Store all user data including viewers
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('firstName', response.data.firstName);
        localStorage.setItem('type', response.data.type);
        localStorage.setItem('email', response.data.email);
        
        // Check if user is a viewer after storing
        if (response.data.type === 'viewer') {
            return {
                success: false,
                message: 'Viewer accounts are not allowed to access the dashboard. You will be redirected to the homepage.',
                isViewer: true,
                redirectToHome: true
            };
        }
        
        return {
            success: true,
            data: response.data,
            message: 'Login successful!'
        };
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Invalid email or password'
        };
    }
};

export const handleSignUp = async (userData) => {
    try {
        const username = userData.username || userData.email.split('@')[0];
        
        const completeUserData = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            age: userData.age || '18',
            gender: userData.gender || 'male',
            contactNumber: userData.contactNumber || '09123456789',
            email: userData.email.toLowerCase(),
            type: 'editor', 
            username: username.toLowerCase(),
            password: userData.password,
            address: userData.address || 'Not provided',
            isActive: true
        };
        
        const response = await createUser(completeUserData);
        
        return {
            success: true,
            data: response.data,
            message: 'Account created successfully! You can now sign in.'
        };
    } catch (error) {
        console.error('Registration error:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Registration failed. Please try again.'
        };
    }
};

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('type');
    
    // Only return true for admin and editor accounts
    if (token && (userType === 'admin' || userType === 'editor')) {
        return true;
    }
    
    return false;
};

export const getCurrentUser = () => {
    return {
        firstName: localStorage.getItem('firstName'),
        type: localStorage.getItem('type'),
        email: localStorage.getItem('email'),
        token: localStorage.getItem('token')
    };
};

export const isAdmin = () => {
    const userType = localStorage.getItem('type');
    return userType === 'admin';
};

export const isEditor = () => {
    const userType = localStorage.getItem('type');
    return userType === 'editor';
};

export const isViewer = () => {
    const userType = localStorage.getItem('type');
    return userType === 'viewer';
};

export const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    localStorage.removeItem('type');
    localStorage.removeItem('email');
    localStorage.removeItem('rememberedEmail');
    window.location.href = '/auth/signin';
};

export const getUserRoleDisplay = () => {
    const type = localStorage.getItem('type');
    switch(type) {
        case 'admin':
            return 'Administrator';
        case 'editor':
            return 'Editor';
        case 'viewer':
            return 'Viewer';
        default:
            return 'User';
    }
};