import { useEffect } from 'react';
import authService from '../app/services/authService';

interface Props {
  expiration?: number; 
  refreshToken: string; 
}

const TokenHandler: React.FC<Props> = ({ expiration, refreshToken }) => {
  useEffect(() => {
      if (!expiration) return;
      
    console.log("Checking expiration time...");    
    const checkAndRefreshToken = () => {
      const buffer = 30 * 60; // 30 minutes buffer
      const currentTime = Math.floor(Date.now() / 1000);

      if (currentTime >= expiration - buffer) {
        console.log('Token is about to expire, refreshing...');
        authService.refreshExpiredToken(refreshToken);
      }
    };

    checkAndRefreshToken();
    const interval = setInterval(checkAndRefreshToken, 60 * 10000); //Checks every 10 minutes

    return () => clearInterval(interval);
  }, [expiration, refreshToken]);

  return null;
};

export default TokenHandler;
