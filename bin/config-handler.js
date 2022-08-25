const { 
  readFileSync,
  writeFileSync,
  unlinkSync
 } = require('fs');


/**
 * Loads the WP-Env config in an object
 *
 * @param {configFile} configFile Path to the WP-Env config file
 * @return {Promise<void>}
 */
function getConfig(configFile) {
  return JSON.parse(readFileSync(configFile, 'utf8'));
}

/**
 * Rewrites the WP-Env config with the options entered by the user
 *
 * @param {config} config Config details to store in the WP-Env config file
 * @param {configFile} configFile Path to the WP-Env config file
 */
function saveConfig(config, configFile) {
  try {
    writeFileSync(configFile, JSON.stringify(config, null, 4), 'utf8');
  } catch (error) {
    console.log('An error has occurred: ', error);
  }
}

/**
 * Removes the config file
 *
 * @param {configFile} configFile Path to the WP-Env config file
 */
 function cleanConfig(configFile) {
  try {
    unlinkSync(configFile);
  } catch (error) {
    console.log('An error has occurred: ', error);
  }
}

module.exports = {
  getConfig,
  saveConfig,
  cleanConfig
};
