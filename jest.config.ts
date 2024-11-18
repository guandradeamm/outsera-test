module.exports = {
  preset: "ts-jest", // Usando ts-jest para lidar com TypeScript
  testEnvironment: "jsdom", // Necessário para testar componentes React
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Usa ts-jest para arquivos TypeScript
  },
  transformIgnorePatterns: [
    "/node_modules/", // Certifique-se de que pacotes necessários não sejam ignorados
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // Mapeando os aliases do TypeScript
  },
};
