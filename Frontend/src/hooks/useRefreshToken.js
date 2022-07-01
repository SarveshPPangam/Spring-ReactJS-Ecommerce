
import useAuth from './useAuth';
import axios from "axios";
import jwt from "jsonwebtoken"

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refreshToken', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            const decoded = jwt.decode(response.data.accessToken);
            const userEmail = decoded?.email;
            const userRole = decoded?.role;
            return {
                ...prev,
                userEmail: userEmail,
                userRole: userRole,
                accessToken: response.data.accessToken
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;