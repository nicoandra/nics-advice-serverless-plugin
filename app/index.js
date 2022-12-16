'use strict';
const Advice = require('./advice')
// Helper method, merge 2 objects. Used for setting up options with default values


/**
 * Performs a deep merge of `source` into `target`.
 * Mutates `target` only but not its objects and arrays.
 *
 * @author inspired by [jhildenbiddle](https://stackoverflow.com/a/48218209).
 */
 function merge(target, source) {
    const isObject = (obj) => obj && typeof obj === 'object';
  
    if (!isObject(target) || !isObject(source)) {
      return source;
    }
  
    Object.keys(source).forEach(key => {
      const targetValue = target[key];
      const sourceValue = source[key];
  
      if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
        target[key] = targetValue.concat(sourceValue);
      } else if (isObject(targetValue) && isObject(sourceValue)) {
        target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue);
      } else {
        target[key] = sourceValue;
      }
    });
  
    return target;
  }

const IGNORE = 'IGNORE'
const SUGGEST = 'SUGGEST'
const REQUIRE = 'REQUIRE'

const adviceLevels = [IGNORE, SUGGEST, REQUIRE]

const defaultOptions = {
    cloudFormation: {
        singleDeploymentBucket: IGNORE
    },
    simpleQueueService: {
        retryPolicyForNonDeadLetterQueues: IGNORE,
        deadLetterQueueNamingConvention: IGNORE,
        messageRetentionTime: IGNORE,
    },
    dynamoDb: {
        retainDeletionPolicy: IGNORE,
        serverSideEncryption: IGNORE
    },
    lambda: {
        specifyTimeout: IGNORE
    },
    suggestedPlugins: {
        logSubscription: {
            pluginUsage: SUGGEST,
            disableAddLambdaPermissions: SUGGEST
        },
        prune: {
            pluginUsage: SUGGEST
        }
    }
}




class NicsAdvicePlugin {
    constructor(serverless, options) {
        this.serverless = serverless
        this.options = merge(defaultOptions, options)
        this.hooks = {
            'package:finalize': () => this.afterPackage()
        }
    }

    performValidation() {
        // TODO ENABLE THIS VALIDATION

        const RULE_OPTIONS_OBJECT = {
            type: 'string',
            enum: ["IGNORE", "REQUIRE", "SUGGEST", 'ignore', 'suggest', 'require']
        }

        this.serverless.configSchemaHandler.defineCustomProperties({
            type: 'object',
            properties: {
                goodAdvice: {
                    type: 'object',
                    properties: {
                        cloudFormation: {
                            type: 'object',
                            properties: {
                                singleDeploymentBucket: RULE_OPTIONS_OBJECT
                            }
                        }
                    }
                }
            }
        })
    }

    init() {
        // Initialization
    }

    afterPackage() {
        const service = this.serverless.service
        const resources = service.resources?.Resources || {}
        const plugins = service.plugins || []
        const provider = service.provider

        // console.log(service, resources, plugins, this.options)
        this.suggestedPlugins();
    }

    /* Suggested Plugins Section */
    suggestedPlugins() {
        this.suggestedPluginsLogSubscription();
        // this.suggestedPluginsPrune();
    }

    suggestedPluginsLogSubscription() {
        const adviceSettings = this.options.suggestedPlugins.logSubscription
        console.log(adviceSettings)
        (new Advice(
            "Log Subscription plugin", 
            "Useful to use with DataDog log forwarders and any other log forwarding mechanism, see https://www.npmjs.com/package/serverless-plugin-log-subscription",
            adviceSettings.pluginUsage,
            true))
    }
}

module.exports = NicsAdvicePlugin;