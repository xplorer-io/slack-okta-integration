export interface OktaUser {
  id: string;
  status: string;
  profile: {
    firstName: string;
    lastName: string;
    email: string;
  };
}
