export interface UserLabel {
  text: string;
}

export interface User {
  id?: number;
  label: UserLabel[];
  type: 'LDAP' | 'Локальная';
  login: string | null;
  password: string | null;
}

export interface UserForm {
  label: string;
  type: 'LDAP' | 'Локальная';
  login: string;
  password: string;
}

export interface UserRow {
  id?: number;
  label: string;
  type: 'LDAP' | 'Локальная';
  login: string | null;
  password: string | null;
  errors: {
    login: boolean;
    password: boolean;
  };
}
