# GIT LIGHT
## version control system
___

INSTALL

```npm install git-light```

```
npm run git-light init
npm run git-light save "commit"
npm run git-light restore "123"
npm run git-light log
npm run git-light diff
```

OR

CLONE THIS REPO AND FOLLOR INSTRUCTIONS BELOW
this [shebang](https://alexewerlof.medium.com/node-shebang-e1d4b02f731d) in src/index.js tells the system that the file only works with node ``` #!/usr/bin/env node ```
```
npm init -y
npm link
git-light init
```

HOW TO REMOVE LINK

``` npm unlink -g git-light```

```
node .src/index.js init
node .src/index.js save "commit"
node .src/index.js restore "123"
node .src/index.js log
node .src/index.js diff
```
