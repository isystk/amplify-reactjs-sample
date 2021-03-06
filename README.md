ð amplify-reactjs-sample
====

![GitHub issues](https://img.shields.io/github/issues/isystk/amplify-reactjs-sample)
![GitHub forks](https://img.shields.io/github/forks/isystk/amplify-reactjs-sample)
![GitHub stars](https://img.shields.io/github/stars/isystk/amplify-reactjs-sample)
![GitHub license](https://img.shields.io/github/license/isystk/amplify-reactjs-sample)

## ð ãã­ã¸ã§ã¯ãã®æ¦è¦

AWS Amplify ã®å­¦ç¿ç¨ãµã³ãã«ã¢ããªã±ã¼ã·ã§ã³ã§ãã


### å©ç¨ãã¦ããæè¡

- React 18
- ReduxToolKit
- typescript
- MaterialUI
- Amplify
- Cognito
- GraghQL

## ð Demo
https://dev.d28qg1769uc44q.amplifyapp.com

![TOPç»é¢](./app1.png "TOPç»é¢")
![ãã¤ãã¼ã¸ä¸è¦§](./app2.png "ãã¤ãã¼ã¸ä¸è¦§")
![æç¨¿ãã©ã¼ã ](./app3.png "æç¨¿ãã©ã¼ã ")


## ð§  AWS ã¯ã©ã¤ãä¸ã«amplifyã®ç°å¢ãæ§ç¯ãã
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
â¯ AWS profile 
  AWS access keys (node:42574) [DEP0128] DeprecationWarning: Invalid 'main' field in '/Users/iseyoshitaka/.nodebrew/node/v16.13.1/lib/node_modules/@aws-amplify/cli/node_modules/cloudform/package.json' of 'packages/cloudform/index.js
? Select the authentication method you want to use: AWS profile

# init ã§ä½æããç°å¢ã AWS ããä¸æ¬ã§åé¤ãããå ´å
$ amplify delete
```

## ð¦ ãã£ã¬ã¯ããªæ§é 

```
.
âââ LICENSE
âââ README.md
âââ amplify
â   âââ #current-cloud-backend
â   âââ backend
â   âââ cli.json
â   âââ hooks
â   âââ team-provider-info.json
âââ node_modules
âââ package.json
âââ public
âââ src
â   âââ App.tsx
â   âââ __test__
â   âââ assets
â   âââ auth
â   âââ aws-exports.js
â   âââ components
â   âââ constants
â   âââ index.tsx
â   âââ pages
â   âââ react-app-env.d.ts
â   âââ reportWebVitals.ts
â   âââ services
â   âââ setupTests.ts
â   âââ stores
â   âââ styles
â   âââ ui-components
âââ tsconfig.json
âââ tsconfig.paths.json
âââ yarn.lock
```


## ðï¸amplify ã®å©ç¨æ¹æ³ 

```shell
# amplify ã³ãã³ããã¤ã³ã¹ãã¼ã«ãã
$ npm install -g @aws-amplify/cli
$ amplify -v
4.16.1

# amplify ãå©ç¨ããçºã®è¨­å®
$ amplify configure
? user name:  amplify-lBpzV

# AWS ãã amplify ã®ç¶æãã­ã¼ã«ã«ã«åãè¾¼ã
$ amplify pull --appId d28qg1769uc44q --envName dev

# ã­ã¼ã«ã« ã®ç¶æã AWS ã® amplify ã¸åæ ãã
$ amplify push

# ææ°ã¢ã¸ã¥ã¼ã«ããã¹ãã£ã³ã°ç°å¢ã«ããã­ã¤ãã
$ amplify publish
```

## ð¬ ä½¿ãæ¹
```text
yarn
yarn start
```

## ð¨ åè

| ãã­ã¸ã§ã¯ã| æ¦è¦|
| :---------------------------------------| :-------------------------------|
| [AWS Amplifyãã¯ããã¦ã¿ãç·¨](https://qiita.com/t_okkan/items/38aca98993bf06598af6)| AWS Amplifyãã¯ããã¦ã¿ãç·¨ |
| [Material Icons](https://v4.mui.com/components/material-icons/)| Material Icons |

## ð« Licence

[MIT](https://github.com/isystk/amplify-reactjs-sample/blob/master/LICENSE)

## ð Author

[isystk](https://github.com/isystk)

