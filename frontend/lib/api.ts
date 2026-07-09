import axios from "axios"

export const strapiRequest = axios.create({
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
