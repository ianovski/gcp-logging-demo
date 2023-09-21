const { Logging } = require('@google-cloud/logging');
const dotenv = require('dotenv');

dotenv.config();

const logHttpRequest = async (req, res, next) => {
  try {
    const projectId = process.env.PROJECT_ID;
    const logName = process.env.LOG_NAME;
    const instanceId = process.env.INSTANCE_ID;
    const instanceName = process.env.INSTANCE_NAME;
    const logging = new Logging({ projectId });
    const log = logging.log(logName);
    
    const { method, url, headers } = req;
    const userAgent = headers['user-agent'];

    res.on('finish', async () => {
      const statusCode = res.statusCode;
      const latencySeconds = 3; // Placeholder
      const responseSize = 256; // Placeholder

      const metadata = {
        resource: { type: 'global' },
        httpRequest: {
          requestMethod: method,
          requestUrl: url,
          status: statusCode,
          userAgent,
          latency: { seconds: latencySeconds },
          responseSize,
        },
	labels: {
	  instanceId,
	  instanceName,
	},
      };

      const entry = log.entry(metadata, 'HTTP request');
      await log.write(entry);
    });
  } catch (error) {
    console.error('Error writing log:', error);
  }

  next();
};

module.exports = logHttpRequest;
