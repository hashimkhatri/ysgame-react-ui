import { useState, useEffect } from 'react';
import { fetchData } from '../utils/ApiUtils';

export function UseColor(trigger) {  // Add trigger as a dependency
    const [color, setColor] = useState(null);
    const [loading, setLoading] = useState(true);   
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const getAvatars = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetchData('get-colors', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                setColor(response.data);
            } catch (error) {
                console.error('Error fetching color detail:', error);
                setError(error);
                setColor(null);
            } finally {
                setLoading(false);
            }
        };

        getAvatars();
    }, [trigger]); 

    return { color, loading, error };
}
