

参考サイト
https://qiita.com/t_okkan/items/38aca98993bf06598af6


#### amplify コマンドをインストールする
```text
$ npm install -g @aws-amplify/cli
$ amplify -v
4.16.1
$ amplify configure
Follow these steps to set up access to your AWS account:

Sign in to your AWS administrator account:
https://console.aws.amazon.com/
Press Enter to continue

Specify the AWS Region
? region:  ap-northeast-1
Specify the username of the new IAM user:
? user name:  amplify-lBpzV
Complete the user creation using the AWS console
https://console.aws.amazon.com/iam/home?region=ap-northeast-1#/users$new?step=final&accessKey&userNames=amplify-lBpzV&permissionType=policies&policies=arn:aws:iam::aws:policy%2FAdministratorAccess-Amplify
Press Enter to continue

Enter the access key of the newly created user:
? accessKeyId:  ********************
? secretAccessKey:  ****************************************
This would update/create the AWS Profile in your local machine
? Profile Name:  default
```

#### amplify で作業を開始する
```text
$ amplify pull --appId d28qg1769uc44q --envName dev
```

#### AWS にamplifyの環境を構築する
```text
$ rm -Rf amplify
$ amplify init
? Initialize the project with the above configuration? No
? Enter a name for the environment dev
? Choose your default editor: IntelliJ IDEA
? Choose the type of app that you're building javascript
Please tell us about your project
? What javascript framework are you using react
? Source Directory Path:  src
? Distribution Directory Path: build
? Build Command:  npm run-script build
? Start Command: npm run-script start
Using default provider  awscloudformation
? Select the authentication method you want to use: (Use arrow keys)
❯ AWS profile 
  AWS access keys (node:42574) [DEP0128] DeprecationWarning: Invalid 'main' field in '/Users/iseyoshitaka/.nodebrew/node/v16.13.1/lib/node_modules/@aws-amplify/cli/node_modules/cloudform/package.json' of 'packages/cloudform/index.js
? Select the authentication method you want to use: AWS profile

# 認証機能を追加する
$ amplify add auth
Do you want to use the default authentication and security configuration? Default configuration
Warning: you will not be able to edit these selections. 
How do you want users to be able to sign in? Email
Do you want to configure advanced settings? No, I am done.
Successfully added auth resource amplifyreactjssample0336150d locally

# AWSに反映する
$ amplify push
┌──────────┬──────────────────────────────┬───────────┬───────────────────┐
│ Category │ Resource name                │ Operation │ Provider plugin   │
├──────────┼──────────────────────────────┼───────────┼───────────────────┤
│ Auth     │ amplifyreactjssample0336150d │ Create    │ awscloudformation │
└──────────┴──────────────────────────────┴───────────┴───────────────────┘
```

#### 



run
```text
yarn
yarn build
yarn start
```
