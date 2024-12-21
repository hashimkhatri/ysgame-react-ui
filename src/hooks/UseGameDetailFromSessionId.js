import { useState, useEffect } from 'react';
import { fetchData } from '../utils/ApiUtils';

export function UseGameDetailFromSessionId(session_id = '') {
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const getGameDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetchData('game/'+session_id, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                
                if (response && session_id != '') {
                    setGame(response);
                } else {
                    setGame(null);
                }



                
            } catch (error) {
                console.error('Error fetching game details:', error);
                setError(error);
                setGame(null);
            } finally {
                setLoading(false);
            }
        };

        getGameDetails();
    }, []);

    return { game, loading, error };
}
