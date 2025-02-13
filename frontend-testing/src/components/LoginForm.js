// src/components/LoginForm.js
import React, { useState } from 'react';

const LoginForm = ({ onSubmit }) => {
    const [email, setEmail] = useState('');

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(email); }}>
            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <button type="submit">Se connecter</button>
        </form>
    );
};

export default LoginForm;
