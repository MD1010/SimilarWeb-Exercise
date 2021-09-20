import axios, { AxiosError } from "axios";
import { METHOD_DOES_NOT_EXIST } from "./consts";

export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
}

export const fetchAPI = async <T = any>(
  method: RequestMethod,
  url: string,
  body?: any,
  params?: any,
  headers?: any
): Promise<{
  res: T | null;
  error: string | null;
}> => {
  switch (method) {
    case RequestMethod.GET: {
      try {
        const { data } = await axios.get<T>(url, { params, headers });
        return { res: data, error: null };
      } catch (error) {
        return { res: null, error: (error as AxiosError).response?.data.error || (error as AxiosError).message };
      }
    }
    case RequestMethod.POST: {
      try {
        const { data } = await axios.post<T>(url, body, { headers, method });
        return { res: data, error: null };
      } catch (error) {
        return { res: null, error: (error as AxiosError).response?.data.error || (error as AxiosError).message };
      }
    }

    case RequestMethod.DELETE: {
      try {
        const { data } = await axios.delete<T>(url, { data: body, headers, method });
        return { res: data, error: null };
      } catch (error) {
        return { res: null, error: (error as AxiosError).response?.data.error || (error as AxiosError).message };
      }
    }

    default:
      throw METHOD_DOES_NOT_EXIST;
  }
};
