

参考サイト
https://qiita.com/t_okkan/items/38aca98993bf06598af6


## amplify の利用方法
```shell
# amplify コマンドをインストールする
$ npm install -g @aws-amplify/cli
$ amplify -v
4.16.1

# amplify を利用する為の設定
$ amplify configure
? user name:  amplify-lBpzV

# AWS から amplify の状態をローカルに取り込む
$ amplify pull --appId d28qg1769uc44q --envName dev

# ローカル の状態を AWS の amplify へ反映する
$ amplify push
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

# init で作成した環境を AWS から一括で削除したい場合
$ amplify delete
```

#### 



run
```text
yarn
yarn build
yarn start
```
