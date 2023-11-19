import React from 'react';

function LoadingView() {

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    margin: 0,
    backgroundColor: 'black',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
  }

  const spinnerContainerStyle: React.CSSProperties = {
    textAlign: 'center',
  }

  const spinnerStyle: React.CSSProperties = {
    border: '4px solid rgba(255, 255, 255, 0.3)',
    borderTop: '4px solid #ffffff',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
    marginBottom: '16px',
  }

  return (
    <div style={containerStyle}>
      <div style={spinnerContainerStyle}>
        <div style={spinnerStyle}></div>
      </div>
      <style>
        {`@keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }`}
      </style>
    </div>
  )

}

export default LoadingView;

