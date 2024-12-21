import { useState, useEffect } from 'react';
import { fetchData } from '../utils/ApiUtils';

export function UseInvitedGame() {
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [invitationCode, setInvitationCode] = useState(
        sessionStorage.getItem("invitation_code")
      );
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const getInvitedGame = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetchData('game-sessions/invitaition/'+invitationCode, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                
                setGame(response.data);
            } catch (error) {
                console.error('Error fetching game detail:', error);
                setError(error);
                setGame(null);
            } finally {
                setLoading(false);
            }
        };

        getInvitedGame();
    }, []);

    return { game, loading, error };
}
