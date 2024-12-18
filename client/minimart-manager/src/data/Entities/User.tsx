import { Role } from "../../constant/enum";

export interface User {
  _id?: string;
  username: string;
  email: string;
  address: string;
  dateOfBirth: string;
  firstname: string;
  image?: string;
  lastname: string;
  phone: string;
  role: string;
  status: Role;
}
