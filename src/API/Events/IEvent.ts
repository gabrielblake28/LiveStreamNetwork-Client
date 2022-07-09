export interface IEvent {
  title: string;
  description: string;
  start_timestamp: Date;
  end_timestamp: Date;
  image: string;
  featured?: boolean;
  user_id: string;
  category_id: string;
  event_id?: string;
  profile_pic?: string;
  name?: string;
  subscription_id?: string;
}
