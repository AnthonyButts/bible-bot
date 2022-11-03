import appRoot from 'app-root-path';
import bunyan from 'bunyan';

function $log(environment: ?string = process.env.NODE_ENV) {
  const streamOptions = {
    production: {
      level: 'warn',
      path: `${appRoot}/logs/server.log`,
    },
    development: {
      level: 'trace',
      stream: process.stdout,
      src: true,
    },
    test: {
      level: 'trace',
      stream: process.stdout,
    },
  };

  return environment !== 'development' && environment ? bunyan.createLogger({
    name: 'server',
    streams: [streamOptions[environment]],
  }) : console;
}

export { $log };
export default $log;
