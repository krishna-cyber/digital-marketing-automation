import axios from "axios"

export const strapiRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
  headers: {
    Authorization: " Bearer " + process.env.NEXT_PUBLIC_STRAPI_KEY,
  },
})

// /upload/files?sort=createdAt:ASC&page=1&pageSize=10&filters[$and][0][folder][id]=1

export const strapiMediaRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
  headers: {
    Authorization: " Bearer " + process.env.NEXT_PUBLIC_STRAPI_KEY,
  },
})

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
})
