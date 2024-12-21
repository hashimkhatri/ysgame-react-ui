import { useState, useEffect } from 'react';
import { fetchData } from '../utils/ApiUtils';

export function UseUserProfile(check_session_allowed = false) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const getUserProfile = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetchData('profile', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                
                if (response && (check_session_allowed ? response.allow_session_create == 1 : true)) {
                    setUser(response);
                } else {
                    setUser(null);
                }



                
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setError(error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        getUserProfile();
    }, []);

    return { user, loading, error };
}
