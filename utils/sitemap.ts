import {ClientTenant} from "~/tenant/types";

export function buildSitemap(stores: ClientTenant[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
          <loc>${process.env.APP_URL}</loc>
      </url>
      ${stores
        .map(({slug}) => {
          return `
              <url>
                  <loc>${`${process.env.APP_URL}/${slug}`}</loc>
              </url>
          `;
        })
        .join("")}
  </urlset>
  `;
}
