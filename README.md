# nics-advice-serverless-plugin
Serverless plugin that brings 100% opinionated tips on your serverless file


# Installation

````
npm i --save-dev serverless-plugin-
````

After that, add the plugin to your list of plugins, as the bottom of the 
list. This is to ensure all other plugins run first, hence looking at the 
effective settings that would be use when deploying to AWS.

# Configuration

This plugin provides advice on multiple topics related to serverless. In 
case you want to ignore some of the items, you can enable or disable them 
by updating the configuration at `custom.nicsAdvices`, the available 
options are:

```
Actions can be:
  IssueType: either one of IGNORE / REQUIRE / SUGGEST
```

````
custom:
  goodAdvice:
    cloudFormation:
      singleDeploymentBucket: IGNORE / REQUIRE / SUGGEST
    simpleQueueService:
      retryPolicyForNonDeadLetterQueues: IGNORE / REQUIRE / SUGGEST
      deadLetterQueueNamingConvention: IGNORE / REQUIRE / SUGGEST
      messageRetentionTime: IGNORE / REQUIRE / SUGGEST
      requiredTags:
        - OneTag
    dynamoDb:
      retainDeletionPolicy: IGNORE / REQUIRE / SUGGEST
      serverSideEncryption: IGNORE / REQUIRE / SUGGEST
      requiredTags:
        - OneTag
    lambda:
      specifyTimeout: IGNORE / REQUIRE / SUGGEST
    suggestedPlugins:
      logSubscription:
        pluginUsage: IGNORE / REQUIRE / SUGGEST
        disableAddLambdaPermissions: IGNORE / REQUIRE / SUGGEST
      prune:
        pluginUsage: IGNORE / REQUIRE / SUGGEST
            

````

# Usage

Perform the advice-check by running `serverless ask-nic` to get a report.


# Usage in CI-CD
