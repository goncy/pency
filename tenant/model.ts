import mongoose, {Schema, Document} from "mongoose";

import {ServerTenant} from "./types";

type TenantModel = Document & ServerTenant;

const TenantSchema = new Schema(
  {
    slug: String,
    category: String,
    color: String,
    phone: String,
    logo: String,
    title: String,
    instagram: String,
    tierUntil: Number,
    facebook: String,
    twitter: String,
    keywords: String,
    tier: String,
    banner: String,
    description: String,
    country: String,
    location: {
      lat: String,
      lng: String,
    },
    highlight: String,
    fields: Array,
    flags: [String],
    layout: String,
    hook: String,
    createdAt: Number,
    mercadopago: {
      token: String,
      refresh: String,
      expiration: Number,
    },
    products: [
      {
        id: String,
        title: String,
        description: String,
        category: String,
        image: String,
        price: Number,
        originalPrice: Number,
        type: {type: String},
        options: {
          type: [
            {
              id: String,
              title: String,
              count: Number,
              required: Boolean,
              options: {
                type: {
                  id: String,
                  title: String,
                  price: Number,
                },
                default: [],
              },
            },
          ],
          default: [],
        },
        featured: Boolean,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, tenant) => {
        // Remove mongo keys for tenant
        delete tenant._id;
        delete tenant.updatedAt;
        delete tenant.createdAt;

        tenant.products?.forEach((product) => {
          product.options?.forEach((option) => {
            // Remove mongo keys for options
            delete option._id;
            delete option.updatedAt;
            delete option.createdAt;
          });

          // Remove mongo keys for products
          delete product._id;
          delete product.updatedAt;
          delete product.createdAt;
        });
      },
    },
  },
);

export default (mongoose.models.Tenant as mongoose.Model<TenantModel>) ||
  mongoose.model<TenantModel>("Tenant", TenantSchema);
