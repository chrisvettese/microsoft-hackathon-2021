//env variable set in docker-compose
let host = process.env['POSTGRES_HOST'];
if (host === undefined) {
  host = 'localhost';
}

export const dbConfig = {
  HOST: host,
  USER: "postgres",
  PASSWORD: "postgres",
  DB: "postgres",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};