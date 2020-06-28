import {NextApiRequest, NextApiResponse} from "next";

import api from "../server";
import {AuthState} from "../../types";

import tenantApi from "~/tenant/api/server";
import sessionApi from "~/session/api/server";
import {ClientTenant} from "~/tenant/types";
import {getExpirationDate} from "~/payment/selectors";
import schemas from "~/tenant/schemas";

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
    slug: ClientTenant["slug"];
  };
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const {query} = req as GetRequest;

    try {
      // Parse the state parameter sent from the frontend
      const state: AuthState = JSON.parse(query.state);

      // Exchange the code for a token and a refresh token
      const credentials = await api.connect(query.code);

      // If the state sent from the frontend has a tenant id and the credentials we just got are valid...
      if (state.id && credentials.access_token && credentials.refresh_token) {
        try {
          // Check if the session is valid
          const session = await sessionApi.verify(state.token);

          // And verify if the user that issued the connection is the one configured on the tenant
          if (session.uid === state.id) {
            try {
              // Update the tenant with the credentials
              await tenantApi.update(
                state.id,
                state.slug,
                schemas.server.mercadopago.cast({
                  mercadopago: {
                    token: credentials.access_token,
                    refresh: credentials.refresh_token,
                    expiration: getExpirationDate(credentials.expires_in),
                  },
                }),
              );

              // Redirect the user to the admin panel again
              return res.writeHead(302, {Location: `/${state.slug}/admin`}).end();
            } catch (error) {
              // If we can't update the tenant, return a 400
              return res.status(400).json({error: "There was an error updating the tenant"});
            }
          } else {
            // If the user wasn't the owner of the tenant, return a 401
            return res.status(401).json({error: "Unauthorized"});
          }
        } catch (error) {
          // If the session is expired, return a 401
          return res.status(401).json({error: "Session expired"});
        }
      }
    } catch (error) {
      // If we had any problem parsing the data or getting the credentials, return a 403
      return res.status(403).json({error: "Bad request"});
    }

    // If nothing happened, return a 304
    return res.status(304).end("Not modified");
  }

  if (req.method === "DELETE") {
    const {
      query: {id, slug},
      headers: {authorization: token},
    } = req as DeleteRequest;

    try {
      // Check if the session is valid
      const session = await sessionApi.verify(token);

      // And verify if the user that issued the connection is the one configured on the tenant
      if (session.uid === id) {
        try {
          // Remove the old credentials from the tenant
          await tenantApi.update(
            id,
            slug,
            schemas.server.mercadopago.cast({
              mercadopago: null,
            }),
          );

          // Return a 200
          return res.status(200).json({success: true});
        } catch (error) {
          // If we can't update the tenant, return a 400
          return res.status(400).end("There was an error updating the tenant");
        }
      } else {
        // If the user wasn't the owner of the tenant, return a 401
        return res.status(401).end("Unauthorized");
      }
    } catch (error) {
      // If the session is expired, return a 401
      return res.status(401).end("Session expired");
    }
  }

  // If nothing happened, return a 304
  return res.status(304).end("Not modified");
};
