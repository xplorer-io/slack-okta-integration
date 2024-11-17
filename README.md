# Slack-Okta-Integration

# Purpose

This automation script is to sync our users between two platforms (i.e. Slack and Okta) by consuming thier REST API.

# Scenario

When someone new joins our slack channel we would like them to be also added into our Okta portal to get access to our vault where we save our secrets for different environment.

# running it locally

Known error referecnes:
https://stackoverflow.com/questions/62096269/unknown-file-extension-ts-for-a-typescript-file
https://github.com/TypeStrong/ts-node/issues/2100

Since ts-node is giving out too much of issue while trying to use it we will be using tsx
npx tsx [filepath]
