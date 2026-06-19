const ENV = 'dev';

const configMap = {
  dev: {
    apiBaseUrl: 'http://localhost:3000/api'
  },
  test: {
    apiBaseUrl: 'https://test.example.com/api'
  },
  prod: {
    apiBaseUrl: 'https://api.example.com/api'
  }
};

function getEnvConfig() {
  return configMap[ENV] || configMap.dev;
}

module.exports = {
  ENV,
  getEnvConfig
};
