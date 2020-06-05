import {ClientTenant} from "~/tenant/types";

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  user_id: number;
  refresh_token: string;
  public_key: string;
  live_mode: boolean;
}

export interface AuthState {
  id: string;
  token: string;
  slug: ClientTenant["slug"];
}
