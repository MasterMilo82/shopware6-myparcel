import 'regenerator-runtime';

// Import all necessary Storefront plugins and scss files
import ShippingOptions
    from './myparcel/plugins/shipping-options.plugin';

// Register them via the existing PluginManager
const PluginManager = window.PluginManager;
PluginManager.register('ShippingOptions', ShippingOptions);