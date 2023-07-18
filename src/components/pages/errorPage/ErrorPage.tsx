import React from 'react';
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className="errorPage-wrapper">
      <div className="errorPage-content">
        <h1 className="errorPage-heading">404</h1>
        <p className="errorPage-message">Oops! Page not found.</p>
        <a href="/" className="errorPage-link">Go back to homepage</a>
      </div>
    </div>
  );
};

export default ErrorPage;
