export interface IUser {
  broadcaster_type: string;
  created_at: Date;
  description?: string;
  display_name: string;
  email?: string;
  id: string;
  login: string;
  profile_image_url?: string;
  offline_image_url?: string;
  type: string;
  view_count: number;
}
