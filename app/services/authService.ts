import * as Linking from 'expo-linking';

const CLIENT_ID = "141607";
const CLIENT_SECRET = "f74f3f95979bc418c9a20f0c9e6c690d832fab40";
const TOKEN_ENDPOINT = "https://www.strava.com/oauth/token";
const USERS_ENDPOINT = "https://www.strava.com/oauth/authorize";
const REDIRECT_URI = "http://localhost:8081/exchange_token";

export interface Athlete {
  id: number;
  username: string | null;
  resource_state: number;
  firstname: string;
  lastname: string;
  bio: string;
  city: string;
  state: string;
  country: string;
  sex: string;
  premium: boolean;
  summit: boolean;
  created_at: string;
  updated_at: string;
  badge_type_id: number;
  weight: number;
  profile_medium: string;
  profile: string;
  friend: unknown;
  follower: unknown;
}

interface AuthResponseWithAthlete {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  athlete: Athlete;
}

interface AuthResponseWithoutAthlete {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

type AuthResponse = AuthResponseWithAthlete | AuthResponseWithoutAthlete;

const fetchToken = async (url: string): Promise<AuthResponse | null> => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data?.access_token) {
      return data;
    } else {
      console.error('Error fetching token:', data);
      return null;
    }
  } catch (error) {
    console.error('Error during fetch:', error);
    return null;
  }
};

const authService = {
  logInUser: (): void => {
    const stravaAuthUrl = `${USERS_ENDPOINT}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&approval_prompt=force&scope=activity:read`;
    Linking.openURL(stravaAuthUrl);
  },

  exchangeCodeForToken: async (code: string): Promise<AuthResponseWithAthlete | null> => {
    const tokenUrl = `${TOKEN_ENDPOINT}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&grant_type=authorization_code`;
    return fetchToken(tokenUrl) as Promise<AuthResponseWithAthlete | null>;
  },

  refreshExpiredToken: async (refreshToken: string): Promise<AuthResponseWithoutAthlete | null> => {
    const refreshTokenUrl = `${TOKEN_ENDPOINT}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${refreshToken}`;
    return fetchToken(refreshTokenUrl) as Promise<AuthResponseWithoutAthlete | null>;
  },
};

export default authService;