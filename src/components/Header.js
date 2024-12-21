import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    return (
        <header>
            <button onClick={goToHome}>Go Home</button>
        </header>
    );
};

export default Header;