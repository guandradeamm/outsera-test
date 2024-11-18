// Importações necessárias
import getConfiguration from "../config/environment"; // Importa a função que retorna a configuração de ambiente (como URLs de base).
import axios, { AxiosResponse } from "axios"; // Importa o axios para fazer as requisições HTTP e o tipo AxiosResponse para tipar as respostas.
import {
  FilmByYear,
  FilmsData,
  IntervalProducers,
  MultipleWinners,
  Studios,
} from "./types"; // Importa os tipos para garantir que as respostas da API sejam tipadas corretamente.

// Configuração do axios para se comunicar com a API
const dashApi = axios.create({
  baseURL: `${getConfiguration().APP_BASE_URL}`, // Configura a URL base da API, obtendo-a a partir das variáveis de ambiente.
  headers: {
    "Content-Type": "application/json", // Define o tipo de conteúdo das requisições como JSON.
  },
  withCredentials: false, // Indica se cookies ou credenciais devem ser enviados nas requisições (false significa que não serão enviados).
});

// Função para obter dados dos filmes com base em parâmetros como página, tamanho, ano e se são vencedores ou não
const getFilmsData = async (
  page: number,
  size: number,
  year: number,
  winner: boolean | string
): Promise<AxiosResponse<FilmsData>> => {
  return dashApi.get(
    `?page=${page}&size=${size}&winner=${winner}&year=${year}` // Realiza uma requisição GET para obter dados de filmes com os parâmetros fornecidos.
  );
};

// Função para obter os vencedores múltiplos (anos com múltiplos vencedores)
const getMultipleWinners = async (): Promise<
  AxiosResponse<MultipleWinners>
> => {
  return dashApi.get(`?projection=years-with-multiple-winners`); // Realiza uma requisição GET para obter os anos com múltiplos vencedores.
};

// Função para obter os estúdios com o número de vitórias
const getStudios = async (): Promise<AxiosResponse<Studios>> => {
  return dashApi.get(`?projection=studios-with-win-count`); // Realiza uma requisição GET para obter os estúdios com a contagem de vitórias.
};

// Função para obter o intervalo máximo e mínimo de vitórias dos produtores
const getIntervalProducers = async (): Promise<
  AxiosResponse<IntervalProducers>
> => {
  return dashApi.get(
    `?projection=max-min-win-interval-for-producers` // Realiza uma requisição GET para obter o intervalo de vitórias dos produtores.
  );
};

// Função para obter os filmes de um ano específico que foram vencedores
const getFilmYear = async (
  year: number
): Promise<AxiosResponse<FilmByYear>> => {
  return dashApi.get(`?winner=true&year=${year}`); // Realiza uma requisição GET para obter filmes vencedores de um ano específico.
};

// Agrupando todas as funções internas para exportação
const InternalServices = {
  getFilmsData, // Obter dados de filmes
  getMultipleWinners, // Obter múltiplos vencedores
  getStudios, // Obter estúdios com vitórias
  getIntervalProducers, // Obter intervalo de vitórias para produtores
  getFilmYear, // Obter filmes vencedores por ano
};

export default InternalServices; // Exporta todas as funções agrupadas para uso em outras partes da aplicação.
