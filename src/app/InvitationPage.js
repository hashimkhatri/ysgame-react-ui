import { useParams } from "react-router-dom";
import { useEffect } from 'react';

export default function InvitationPage() {
    const { invitation_code } = useParams();
    useEffect(() => {
        sessionStorage.setItem("invitation_code", invitation_code);
        window.location.href = "/guest-view";
    }, [])
    return (
        <></>
    );
}