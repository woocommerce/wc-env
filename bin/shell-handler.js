var spawnSync = require("child_process").spawnSync;

/**
 * Starts the local environment using WP-Env
 */
function startEnvironment() {
  sendShCommand("npx wp-env start");
}

/**
 * Stops the existing environment if any
 */
 function stopEnvironment() {
  sendShCommand("npx wp-env stop");
}

/**
 * Stops and removes the existing environment if any
 */
function destroyEnvironment() {
  sendShCommand("npx wp-env destroy");
}

/**
 * Activates the desired plugin, which would be defined in advance in the WP-Env
 * configuration file
 *
 * @param {string} pluginName Name of the plugin to activate
 */
function activatePlugin(pluginName) {
  sendShCommand(`npx wp-env run tests-cli wp plugin activate ${pluginName}`);
}

/**
 * Creates {amount} instances of the desired data type using WC Smooth Generator.
 *
 * @param {string} entity Type of data (coupons, products, orders...) to create
 * @param {number} amount Amount of data to create
 */
function generate(entity, amount) {
  sendShCommand(`npx wp-env run tests-cli wp wc generate ${entity} ${amount}`);
}

/**
 * Executes a command in the shell and shows the output in real time
 *
 * @param {string} command Sh command to execute
 */
function sendShCommand(command) {
  spawnSync(command, {
    stdio: "inherit",
    shell: true,
  });
}

module.exports = {
  startEnvironment,
  stopEnvironment,
  destroyEnvironment,
  activatePlugin,
  generate,
};
