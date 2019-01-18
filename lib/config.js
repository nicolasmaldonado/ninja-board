/*
 *  Create and export configuration variables
 *
 */

//  Container for al the environments
var environments = {};

//  Staging (default) environments
environments.staging = {
  'httpPort': process.env.HTTP_PORT,
  'httpsPort': process.env.HTTP_PORT + 1,
  'envName': 'staging',
  'hashingSecret': 'thisIsASecret',
  'maxChecks' : 5,
  'tokensLength' : 32,
  'checksIdLength' : 32,
  'dbUser' : process.env.DB_USER,
  'dbPswd' : process.env.DB_PSWD
};

//  Production environment
environments.production = {
  'httpPort': process.env.HTTP_PORT,
  'httpsPort': process.env.HTTP_PORT + 1,
  'envName': 'production',
  'hashingSecret': 'thisIsAlsoASecret',
  'maxChecks' : 5,
  'tokensLength' : 32,
  'checksIdLength' : 32,
  'dbUser' : process.env.DB_USER,
  'dbPswd' : process.env.DB_PSWD
};

//  Determine which environment was passed as a command-line argument
var curretenvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';
//

//  Check that the curret environment is one of the environments above, if not, default to Staging
var environmentsToExport = typeof(environments[curretenvironment]) == 'object' ? environments[curretenvironment] : environments.staging;

//  Export the module
module.exports = environmentsToExport;
