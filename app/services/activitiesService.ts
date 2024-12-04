import { useQuery } from 'react-query';

const activitiesEndpoint = "https://www.strava.com/api/v3/athlete/activities";

interface Athlete {
  id: number;
  resource_state: number;
}

interface Map {
  id: string;
  summary_polyline: string | null;
  resource_state: number;
}

export interface Activity {
  resource_state: number;
  athlete: Athlete;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  sport_type: string;
  workout_type: string | null;
  id: number;
  start_date: string;
  start_date_local: string;
  timezone: string;
  utc_offset: number;
  location_city: string | null;
  location_state: string | null;
  location_country: string;
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  map: Map;
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  visibility?: string; 
  flagged: boolean;
  gear_id: string | null;
  start_latlng: number[] | null;
  end_latlng: number[] | null;  
  average_speed: number;
  max_speed: number;
  has_heartrate: boolean;
  heartrate_opt_out: boolean; 
  display_hide_heartrate_option: boolean;
  upload_id: string | null;
  external_id: string | null;
  from_accepted_tag: boolean;
  pr_count: number;
  total_photo_count: number;
  has_kudoed: boolean;
}

export interface MonthStat {
  month: string;
  total_distance: number;
  total_time: number;
  total_elevation_gain: number;
}

const activitiesService = {
  getAllActivities: async (token: string): Promise<Activity[]> => {
    const response = await fetch(activitiesEndpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching activities');
    }
    return response.json();
  },
};

export const useActivities = (token: string) => {
  return useQuery(['activities', token], () => activitiesService.getAllActivities(token), {
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // cache activities for 5 minutes
  });
};
