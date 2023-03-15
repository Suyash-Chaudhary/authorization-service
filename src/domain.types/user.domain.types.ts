import { BaseSearchModel } from "./base.types";

export interface UserCreateModel {
  Phone?: string;
  Email?: string;
  CountryCode?: string;
}

export interface RegisterViaEmailModel {
  Email: string;
  Password: string;
}

export interface LoginViaEmail {
  Email: string;
  Password: string;
}

export interface UserUpdateModel {
  Phone?: string;
  Email?: string;
  CountryCode?: string;
}

export interface UserSearchModel extends BaseSearchModel {
  Phone?: string;
  Email?: string;
}
