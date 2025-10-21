export interface Package {
  id: string;
  location: string;
  temperature: number;
  humidity: number;
  delivered: boolean;
  sender_id: string;
  driver_id: string;
  arrival_date: Date;
  date: Date;
}
