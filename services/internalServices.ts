//Construcao interna dos servicos de endpoints e metodos APIS

import getConfiguration from "@/config/environment";
import axios, { AxiosResponse } from "axios";
import {
  FilmByYear,
  FilmsData,
  IntervalProducers,
  MultipleWinners,
  Studios,
} from "./types";

// Config

const dashApi = axios.create({
  baseURL: `${getConfiguration().APP_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

//Films Data

const getFilmsData = async (
  page: number,
  size: number,
  year: number,
  winner: boolean | string
): Promise<AxiosResponse<FilmsData>> => {
  return dashApi.get(
    `?page=${page}&size=${size}&winner=${winner}&year=${year}`
  );
};

//Multiple Winners

const getMultipleWinners = async (): Promise<
  AxiosResponse<MultipleWinners>
> => {
  return dashApi.get(`?projection=years-with-multiple-winners`);
};

//Studios
const getStudios = async (): Promise<AxiosResponse<Studios>> => {
  return dashApi.get(`?projection=studios-with-win-count`);
};

//Interval for producers
const getIntervalProducers = async (): Promise<
  AxiosResponse<IntervalProducers>
> => {
  return dashApi.get(
    `?projection=max-min-win-interval-for-pro
ducers`
  );
};

//Film by year
const getFilmYear = async (
  year: number
): Promise<AxiosResponse<FilmByYear>> => {
  return dashApi.get(`?winner=true&year=${year}`);
};

const InternalServices = {
  getFilmsData,
  getMultipleWinners,
  getStudios,
  getIntervalProducers,
  getFilmYear,
};

export default InternalServices;
