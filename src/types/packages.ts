export interface Package {
  id: string;
  location: string;
  temperature: number;
  humidity: number;
  delivered: boolean;
  receiver_id: string;
  driver_id: string;
  arrival_date: Date;
  date: Date;
  destination: string;
  sender: string;
  thresholds: [];
}
