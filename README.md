# WC Env
WC Env is a Node.js CLI tool that lets you create WooCommerce test sites with minimum effort to assist with the development and testing of WooCommerce's features, themes and plugins.

It is based on the following components:

[WP-Env](https://github.com/WordPress/gutenberg/tree/trunk/packages/env): 
WP-Env is used to set up a WordPress site locally with a specific configuration, such as the desired PHP and WP versions or a given plugin or theme. In a nutshell, it is used to handle the local environment.

[WC Smooth Generator](https://github.com/woocommerce/wc-smooth-generator):
This tool used used to generate multiple instances of different kinds of WooCommerce data, such as coupons, products and orders.

## Getting Started

### Requirements
This tool requires [Node.js](https://nodejs.org/en/) and a valid [WooCommerce](https://github.com/woocommerce/woocommerce) zip file to work.

### Installation
1. Clone this repository.
2. Open a terminal into the root folder.
3. Run `npm install`.
4. Run `node wc-env --help`.
5. Check the help info is shown in your terminal.

### Commands
#### Create
Creates a new local WooCommerce site that can be configured based on multiple options sent by the user.
* **Arguments**:

    * **wcUrl**: Url to the WooCommerce zip file to be tested.
* **Options**:
    * **php**: desired PHP version. If none is specified, it will pick the one in the `.wp-env.json` file, which is the latest one by default.
    * **wp**: desired WordPress version. If none is specified, it will pick the one in the `.wp-env.json` file, which is the latest one by default.
    * **port**: the port to run the site.
    * **cot**: enable the *Custom Order Tables* feature in WooCommerce.
    * **coupons**: create a number of random coupons.
    * **customers**: create a number of random customers.
    * **products**: create a number of random products.
    * **orders**: create a number of random orders.

Examples:

- Site with the `feature-custom-order-table` WC version in port 8024, with the latest PHP and WP versions, COT enabled, 50 products and 200 orders:
```
node wc-env create https://github.com/woocommerce/woocommerce/files/9392652/woocommerce.zip --port 8024 --products 50 --orders 200 --cot
```
- Site with WC 6.8.0 in the default port (8889), with PHP 7.4 and WP 5.9, COT disabled and no initial data:
```
node wc-env create https://github.com/woocommerce/woocommerce/releases/download/6.8.0/woocommerce.zip --php 7.4 --wp 5.9
```
- Site with WC 6.8.0 in the default port (8889), with latest PHP and WP, COT disabled and no initial data:
```
node wc-env create https://github.com/woocommerce/woocommerce/releases/download/6.8.0/woocommerce.zip
```

You can see the command help running `node wc-site-loader create --help`

#### Stop
Stops the local environment but data persists, so it can be resumed again.

#### Destroy
Stops and deletes the local environment.

## Contributions
Please, feel free to contribute to this project with questions, ideas, requests or improvements. We are looking forward to hearing from you!