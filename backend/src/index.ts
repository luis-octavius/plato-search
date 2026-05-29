import 'dotenv/config';
import createApp from './app';

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

async function main() {
  try {
    const app = createApp();

    app.listen(PORT, () => {
      console.log(`
╔═══════════════════════════════════╗
║      PlatoSearch Backend           ║
║      🏛️  Servidor iniciado         ║
╠═══════════════════════════════════╣
║ Port:        ${PORT}                    ║
║ Environment: ${NODE_ENV.padEnd(6)}               ║
║ API:         http://localhost:${PORT}/api     ║
║ Health:      http://localhost:${PORT}/health  ║
╚═══════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

main();
