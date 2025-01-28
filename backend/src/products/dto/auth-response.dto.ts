import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AuthResponseDto {
  @Expose()
  access_token: string;

  @Expose()
  user: {
    id: number;
    email: string;
    role: string;
  };
}