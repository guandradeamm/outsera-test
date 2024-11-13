// No caso de uma construçao de ambiente, faria algo parecido com isso aqui

// declare const window: any;

// const getEnvironment = () => {
//   switch (window.ENVIRONMENT) {
//     case "DEV":
//       return appConfig.dev;
//     case "UAT":
//       return appConfig.uat;
//     case "PROD":
//       return appConfig.prod;
//     default:
//       return appConfig.local;
//   }
// };
// const environment = getEnvironment();

// type appType = {
//   APP_BASE_URL: string;
//   ENV: string;
// };

// const appConfig = {
//   local: {
//     APP_BASE_URL: "https://tools.outsera.com/backend-java/api/movies",
//     ENV: environment,
//   },
//   DEV: {
//     APP_BASE_URL: `${window.location.protocol}//${window.location.hostname}/backend-java/api`,
//     ENV: environment,
//   },
//   UAT: {
//     APP_BASE_URL: `${window.location.protocol}//${window.location.hostname}/backend-java/api`,
//     ENV: environment,
//   },
//   PROD: {
//     APP_BASE_URL: `${window.location.protocol}//${window.location.hostname}/backend-java/api`,
//     ENV: environment,
//   },
// };

// export default function getConfiguration(): appType {
//   return appConfig[environment] ? appConfig[environment] : appConfig.local;
// }

//Construcao de uma base URL
const appConfig = {
  APP_BASE_URL: " https://challenge.outsera.tech/api/movies",
};

export default function getConfiguration() {
  return appConfig;
}
