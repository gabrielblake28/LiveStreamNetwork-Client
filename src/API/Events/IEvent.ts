export interface IEvent {
  title: string;
  description?: string;
  start_timestamp: Date;
  end_timestamp: Date;
  image?: File;
  featured?: boolean;
  user_id: string;
  category_id?: string;
  event_id?: string;
}
