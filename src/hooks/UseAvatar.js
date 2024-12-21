import { useState, useEffect } from 'react';
import { fetchData } from '../utils/ApiUtils';

export function UseAvatar(trigger) {  // Add trigger as a dependency
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(true);   
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const getAvatars = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetchData('get-avatars', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                setAvatar(response.data);
            } catch (error) {
                console.error('Error fetching avatar detail:', error);
                setError(error);
                setAvatar(null);
            } finally {
                setLoading(false);
            }
        };

        getAvatars();
    }, [trigger]); 

    return { avatar, loading, error };
}
