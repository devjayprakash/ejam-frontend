export const IS_PROD = process.env.NODE_ENV === "production";
export const BASE_URL = IS_PROD ? "" : "http://localhost:8080/api/v1";
export const FETCH_ALL_DEPLOYMENTS = BASE_URL + "/deployment/all";
export const CREATE_NEW_DEPLOYMENT = BASE_URL + "/deployment/create";
export const DELETE_DEPLOYMENT_URL = BASE_URL + "/deployment/delete";
