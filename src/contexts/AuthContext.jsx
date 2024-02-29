import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

function AuthContextProvider(props) {
    const [user, setUser] = useState(null);
    const [userWithPass, setUserWithPass] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        const run = async () => {
            try {
                setLoading(true);
                let token = localStorage.getItem('token');
                if(!token) { return }
                const result = await axios.get('http://127.0.0.1:8000/auth/me', {
                    headers: { Authorization : `Bearer ${token}` }
                });
                delete result.data.password;
                //console.log(result.data);
                setUser(result.data);

                const resultWithPass = await axios.get('http://127.0.0.1:8000/auth/me', {
                    headers: { Authorization : `Bearer ${token}` }
                });
                setUserWithPass(resultWithPass.data);
            } catch (err) {
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        };
        run();
    }, []);

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={ {user, setUser, userWithPass, setUserWithPass, loading, logout} }>
            {props.children}
        </AuthContext.Provider>
    )
};

export { AuthContextProvider }
export default AuthContext;