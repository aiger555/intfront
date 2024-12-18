import React from 'react';

const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div>
                        <a href="/" className="navbar-brand">
                            User and Journal Management System
                        </a>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a href="/users" className="nav-link">
                                    Users
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/journals" className="nav-link">
                                    Journals
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default HeaderComponent;
