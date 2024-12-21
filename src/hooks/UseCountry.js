import { useState, useEffect } from 'react';
import { fetchData } from '../utils/ApiUtils';

export function UseCountry() { 
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);   
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const getCountries = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetchData('countries', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                setCountry(response.data);
            } catch (error) {
                console.error('Error fetching country detail:', error);
                setError(error);
                setCountry(null);
            } finally {
                setLoading(false);
            }
        };

        getCountries();
    }, []); 

    return { country, loading, error };
}
