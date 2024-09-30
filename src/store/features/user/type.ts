export interface USER {
  id: string;
  group_id: number;
  username?: string;
  password?: string;
  is_active: string;
  last_login: string | null;
  is_super_user: string;
  date_joined: string;
  login_from: string | null;
  profile_picture: string;
  created_date: string;
  updated_date: string;
}
