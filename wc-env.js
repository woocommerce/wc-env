const { Command } = require('commander');

const { 
  getConfig, 
  saveConfig, 
  cleanConfig
} = require('./bin/config-handler.js');

const {
  startEnvironment,
  stopEnvironment,
  destroyEnvironment,
  activatePlugin,
  generate,
} = require('./bin/shell-handler.js');

const config = getConfig('./.wp-env.json');
const program = new Command();

program
  .name('WC Env')
  .description('CLI tool to spin up a local WooCommerce site with multiple configurations')
  .version('0.0.1');

program
  .command('create')
  .description('Create a local WooCommerce site with multiple configurations')
  .argument('<wcUrl>', 'URL to the desired WooCommerce zip file')
  .option('--php <version>', 'PHP version')
  .option('--wp <version>', 'WordPress version')
  .option('--port <number>', 'Port to run the site on')
  .option('--cot', 'Enable COT')
  .option('--coupons <number>', 'Number of coupons to create')
  .option('--customers <number>', 'Number of customers to create')
  .option('--products <number>', 'Number of products to create')
  .option('--orders <number>', 'Number of orders to create')
  .action((wcUrl, options) => {
    // Get PHP version from options
    config.phpVersion = options.php ? options.php : config.phpVersion;

    // Get WP version from options
    config.core = options.wp ? `WordPress/WordPress#${options.wp}` : config.core;

    // Get port from options
    config.env.tests.port = options.port
      ? parseInt(options.port, 10)
      : parseInt(config.env.tests.port, 10);

    if (config.plugins.some((item) => item.includes('woocommerce.zip'))) {
      // Replace the item that contains 'woocommerce.zip' in config.plugins
      // with the new 'woocommerce.zip passed by argument
      config.plugins = config.plugins.map((item) =>
        item.includes('woocommerce.zip') ? wcUrl : item
      );
    } else {
      // Install WooCommerce before any other plugin
      config.plugins.unshift(wcUrl);
    }

    // Save wp-env config file with the new options entered by user
    saveConfig(config, '.wp-env.override.json');

    // Set up the local environment
    startEnvironment();

    // Setup data
    options.coupons ? generate('coupons', options.coupons) : null;
    options.customers ? generate('customers', options.customers) : null;
    options.products ? generate('products', options.products) : null;
    options.orders ? generate('orders', options.orders) : null;

    // Install plugins
    options.cot ? activatePlugin('cot-plugin') : null;

    // Log user details
    console.log('User: Admin');
    console.log('Password: password');

    // Remove temporary config file
    cleanConfig('.wp-env.override.json');
  });

program
  .command('stop')
  .description('Stop the local environment')
  .action(() => {
    stopEnvironment();
  });

program
  .command('destroy')
  .description('Remove the local environment')
  .action(() => {
    destroyEnvironment();
  });

program.parse();
