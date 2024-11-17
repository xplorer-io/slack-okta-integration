# Slack-Okta-Integration

# Purpose

This automation script is to sync our users between two platforms (i.e. Slack and Okta) by consuming thier REST API.

# Scenario

When someone new joins our slack channel we would like them to be also added into Okta to get access to our hashicorp vault and other platforms.

## running it locally

To perform test on individual services files to see what response we expect from the API.

Known error referecnes:
https://stackoverflow.com/questions/62096269/unknown-file-extension-ts-for-a-typescript-file
https://github.com/TypeStrong/ts-node/issues/2100

Since ts-node is giving out too much of issue while trying to run it, we will be using tsx.
npx tsx [filepath]

## Okta API

We need to consume 3 API's from okta to achieve our goals.

1. List all users
   https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/#tag/User/operation/listUsers

2. Create a user
   https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/#tag/User/operation/createUser

3. Delete a user
   https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/#tag/User/operation/deleteUser

## Slack API

Consume API [users.list](https://api.slack.com/methods/users.list)
Since slack does not provide with up to date users list, we have to filter out the users who are active and not bot.b
