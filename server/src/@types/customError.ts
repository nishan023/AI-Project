export interface CustomError extends Error {
  statusCode?: any;
  status?: string;
  path?: any;
  value?: any;
}
export interface error extends Error {
  status?: any;
  statusCode?: any;
}
