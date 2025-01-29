import { User } from "src/users/users.entity";

export interface AuthenticatedRequest extends Request {
  user: User
}