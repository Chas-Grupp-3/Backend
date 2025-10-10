export interface Package {
  id: string;
  location: string;
  temperature: number;
  humidity: number;
  delivered: boolean;
  sender: string;
  date: Date;
}
