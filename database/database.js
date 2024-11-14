const { Pool } = require("pg");

// Database connection configuration
const dbConfig = {
  user: "postgres",
  password: "Maiya_$0980",
  host: "localhost",
  port: 5432,
  database: "PRMS",
};

// Create a new PostgreSQL pool
const dbClient = new Pool(dbConfig);

// Optional: Graceful shutdown on process exit
process.on("SIGINT", async () => {
  try {
    await dbClient.end();
    console.log("PostgreSQL pool disconnected");
    process.exit(0);
  } catch (err) {
    console.error("Error disconnecting PostgreSQL pool", err);
    process.exit(1);
  }
});

module.exports = dbClient;
