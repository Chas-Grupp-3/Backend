export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "driver" | "user" | "admin";
}
