import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/UseContext';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleSingOut = () => {
        logOut()
    };

    return (
        <div className="navbar bg-primary text-primary-content">
            <Link to="/" className="btn btn-ghost normal-case text-xl">Auth Context</Link>

            <Link to="/home" className="btn btn-ghost normal-case text-xl">Home</Link>

            <Link to="/login" className="btn btn-ghost normal-case text-xl">Login</Link>

            <Link to="/register" className="btn btn-ghost normal-case text-xl">Registration</Link>


            {
                user?.email ? <button onClick={handleSingOut} className='btn btn-sm'>Sing Out</button> : <Link to="/login"><button>Login</button></Link>
            }

        </div>

    );
};

export default Header;