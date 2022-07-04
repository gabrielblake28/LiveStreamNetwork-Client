export interface IEvent {
  title: string;
  description: string;
  start_timestamp: Date;
  end_timestamp: Date;
  image?: string;
  featured: boolean;
  user_id: string;
  category_id: string;
  event_id?: string;
  profile_pic?: string;
  name: string;
  subscription_id?: string;
}

export function toFormData(formData: FormData, event: IEvent): FormData {
  for (var key in event) {
    if (key == "start_timestamp" || key == "end_timestamp") {
      formData.append(key, event[key].toUTCString());
    } else if (key == "featured" || key == "imageTest") {
    } else {
      formData.append(key, event[key]);
    }
  }

  return formData;
}
