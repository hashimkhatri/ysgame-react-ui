import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { GoogleSignInProvider } from "./context/GoogleSignInContext";
import { LoaderProvider } from "./utils/LoaderManager";
import GoogleLoginPage from "./app/auth/GoogleLoginPage";
import LobbyPage from "./app/LobbyPage";
import NotFound from "./app/NotFound";
import InvitationPage from "./app/InvitationPage";
import GuestViewPage from "./app/GuestViewPage";
import ProfileSetupPage from "./app/ProfileSetupPage";
import AccountConfirmationPage from "./app/auth/AccountConfirmationPage";
import PrivacyConsentPage from "./app/auth/PrivacyConsentPage";
import GameSessionPage from "./app/GameSessionPage";
import ProfilePage from "./app/ProfilePage";
import SettingPage from "./app/SettingPage";
import EditProfilePage from "./app/EditProfilePage";
import GameSubmissionPage from "./app/GameSubmissionPage";


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

function App() {
  return (
    <GoogleOAuthProvider clientId="372029074880-3p219cju3fama53qj253mnmdgokrdmd8.apps.googleusercontent.com">
      <GoogleSignInProvider>
        <LoaderProvider>
          <Router>
            <Routes>
              <Route path="/" element={<GoogleLoginPage />} />
              <Route path="/auth/account-confirmation" element={<AccountConfirmationPage />} />
              <Route path="/auth/privacy-consent" element={<PrivacyConsentPage />} />
              <Route path="/lobby" element={<LobbyPage />} />
              <Route path="/invitation/:invitation_code" element={<InvitationPage />} />
              <Route path="/guest-view" element={<GuestViewPage />} />
              <Route path="/game-session/:invitation_code" element={<GameSessionPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/setting" element={<SettingPage />} />
              <Route path="/edit-profile" element={<EditProfilePage />} />
              <Route path="/game-submission-status" element={<GameSubmissionPage />} />
              <Route path="/profile/setup" element={<ProfileSetupPage />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </LoaderProvider>
      </GoogleSignInProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
