export interface DateOfBirth {
  day: string;
  month: string;
  year: string;
}

export interface UserData {
  gender?: 'male' | 'female';
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth?: DateOfBirth;
  company?: string;
  newsletter?: boolean;
}

export interface RegistrationData {
  validUser: UserData;
  validUserFemale: UserData;
  minimumRequiredFields: UserData;
  invalidData: any;
}
