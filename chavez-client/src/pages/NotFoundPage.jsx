import React from 'react';

function NotFoundPage() {
    return (
        <div style={{
            background: 'linear-gradient(135deg, #000000 0%, #615d5d 100%)',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 0,
            padding: '20px',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <div style={{
                textAlign: 'center',
                color: 'white'
            }}>
                <div style={{
                    fontSize: '6rem',
                    marginBottom: '20px'
                }}>
                    😔
                </div>
                
                <h1 style={{
                    fontSize: '8rem',
                    margin: 0,
                    fontWeight: 'bold',
                    letterSpacing: '0.1em'
                }}>
                    404 Error
                </h1>
                <p style={{
                    fontSize: '2rem',
                    margin: '20px 0 10px 0',
                    fontWeight: '500'
                }}>
                    Oops! Page Not Found 
                </p>
                <p style={{
                    fontSize: '1.2rem',
                    color: '#cccccc',
                    margin: 0
                }}>
                    The link you clicked to get here must be broken. Please try again. 
                </p>
            </div>
        </div>
    );
};

export default NotFoundPage;