import axios from 'axios'

export const http = axios.create({
  baseURL: "http://localhost:5500",
  headers: {
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
  },
});