/**
 * Provides constants on initialization for managing the environment
 *
 * @module lib/environment
 */

const { hostname, arch, cpus, platform, totalmem } = require('os');

/**
 * Returns true when NODE_ENV is set to production
 *
 * @static
 * @constant
 * @type {boolean}
 * */
const isProd = process.env.NODE_ENV === 'production';

/**
 * Log level for default logger
 *
 * @static
 * @constant
 * @type {string}
 */
const logLevel = process.env.LOG_LEVEL || (isProd ? 'info' : 'silly');

/**
 * The service name
 *
 * @static
 * @constant
 * @type {string}
 */
const serviceName = process.env.SERVICE_NAME || 'unspecified';

/**
 * The region the service is running.
 *
 * Defaults to an AWS common region (us-east-1).
 *
 * @static
 * @constant
 * @type {string}
 */
const region =
  process.env.AWS_REGION ||
  process.env.AWS_DEFAULT_REGION ||
  process.env.REGION ||
  'us-east-1';

/**
 * Default metadata for logging services
 *
 * @static
 * @constant
 * @type {Object.<string, any>}
 */
module.exports = {
  defaultMeta: {
    region,
    service: serviceName,
    host: hostname(),
    arch: arch(),
    cpus: cpus().length,
    platform: platform(),
    totalmem: `${parseInt(totalmem() / 1000.0 ** 2, 10)}MB`,
    category: 'no-category',
  },
  logLevel,
  isProd,
};
