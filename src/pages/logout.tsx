import { useAuth } from '../context/AuthContext';

const Logout = () => {
    const { logout } = useAuth();

    return <button className="btn btn-success float-end" onClick={logout}>Logout</button>;
};

export default Logout;