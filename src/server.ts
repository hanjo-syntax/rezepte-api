import app from "./app.ts";
import { getPostgresPool } from "./pool.postgres.ts";

const PORT = Number(process.env.PORT) || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});

function shutdown(signal: NodeJS.Signals): void {
  console.log(`${signal} empfangen. Server wird beendet.`);

  server.close(async (serverError) => {
    try {
      await getPostgresPool().end();
    } catch (poolError) {
      console.error("Postgres-Pool konnte nicht geschlossen werden:", poolError);
      process.exitCode = 1;
    }

    if (serverError) {
      console.error("HTTP-Server konnte nicht sauber geschlossen werden:", serverError);
      process.exitCode = 1;
    }
  });
}

process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));
