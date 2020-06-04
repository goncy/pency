import {NextApiRequest, NextApiResponse} from "next";

import fetch from "~/utils/fetch";
import tenantApi from "~/tenant/api/server";
import sessionApi from "~/session/api/server";
import {ClientTenant} from "~/tenant/types";
import {DEFAULT_SERVER_TENANT} from "~/tenant/constants";

interface GetRequest extends NextApiRequest {
  query: {
    code: string;
    state: string;
  };
}

interface DeleteRequest extends NextApiRequest {
  headers: {
    authorization: string;
  };
  query: {
    id: ClientTenant["id"];
  };
}

interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  user_id: number;
  refresh_token: string;
  public_key: string;
  live_mode: boolean;
}

interface AuthState {
  id: string;
  token: string;
  slug: ClientTenant["slug"];
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const {query} = req as GetRequest;

    try {
      const state: AuthState = JSON.parse(query.state);

      const response: AuthResponse = await fetch(
        "POST",
        `https://api.mercadopago.com/oauth/token`,
        {
          client_id: process.env.MERCADOPAGO_CLIENT_ID,
          client_secret: process.env.MERCADOPAGO_CLIENT_SECRET,
          grant_type: "authorization_code",
          code: query.code,
          redirect_uri: `${process.env.APP_URL}/api/payment/auth`,
        },
      );

      if (state.id && response.access_token && response.refresh_token) {
        try {
          const session = await sessionApi.verify(state.token);

          if (session.uid === state.id) {
            try {
              await tenantApi.update(state.id, {
                mercadopago: {
                  token: response.access_token,
                  refresh: response.refresh_token,
                },
              });

              return res.writeHead(302, {Location: `/${state.slug}/admin`}).end();
            } catch (error) {
              return res.status(400).send({error: "There was an error updating the tenant"});
            }
          } else {
            return res.status(401).end({error: "Unauthorized"});
          }
        } catch (error) {
          return res.status(401).end({error: "Session expired"});
        }
      }
    } catch (error) {
      return res.status(403).end({error: "Bad request"});
    }
  }

  if (req.method === "DELETE") {
    const {
      query: {id},
      headers: {authorization: token},
    } = req as DeleteRequest;

    try {
      const session = await sessionApi.verify(token);

      if (session.uid === id) {
        try {
          await tenantApi.update(id, {
            mercadopago: DEFAULT_SERVER_TENANT.mercadopago,
          });

          return res.status(200).json({success: true});
        } catch (error) {
          return res.status(400).json({error: "There was an error updating the tenant"});
        }
      } else {
        return res.status(401).json({error: "Unauthorized"});
      }
    } catch (error) {
      return res.status(401).json({error: "Session expired"});
    }
  }

  return res.status(304).json({error: "Not modified"});
};
