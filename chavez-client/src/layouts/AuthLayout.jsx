import { Outlet, useLocation } from 'react-router-dom';
import timelessWhite from '../assets/timeless_white.png';
import timelessBlack from '../assets/timeless_black.png';

const AuthLayout = () => {
    const location = useLocation();
    const isSignIn = location.pathname === '/auth/signin';
    
    const backgroundImage = isSignIn ? timelessWhite : timelessBlack;
    const imageAlt = isSignIn ? "Timeless White" : "Timeless Black";

    return (
        <section className='min-h-screen bg-zinc-100 text-zinc-900'>
            <div className='grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]'>
                <div className='relative hidden lg:block'>
                    <img 
                        src={backgroundImage}
                        alt={imageAlt}
                        className='absolute inset-0 h-full w-full object-cover'
                    />
                    <div className='absolute inset-0 bg-black/10'></div>
                </div>

                <main className='flex items-center justify-center bg-white px-6 py-10 sm:px-10 lg:px-16'>
                    <div className='mx-auto w-full max-w-md'>
                        <Outlet />
                    </div>
                </main>
            </div>
        </section>
    );
};

export default AuthLayout;