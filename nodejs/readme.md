Using the AWS Lamdba for Node.js application

Serverless???
--> The Code will be activated and executed then only the Compute Service, Networking and Storage will be activated

serverless framework
-- used to provide application deployment configiguration of Node.js apps on Lambda
-- The 'deploy' command to perform following - use the serverless.yml and read teh configuration for deployment - service: <NAME-OF-THE-SERVICE> - provider - serverice provider e.g. aws - name: aws - runtime - Hosting runtime enviornment expected to be set on server - Node.js - timeout - time in seconds to respond to the request - stage - deployment stage - testing - production - region - ap-south-1 - functions: - api: - handler: lambda.universal - global to all services hosted on AWS - events - http

- serverless frkw - crerate a build - zip package - upload the zip package - deploy

aws-serverless-express

- Configure the Express REST API to work on aws serverless serveice e.g. Lambda

==========================================================

1. npm init -y command to create package.json
2. npm install -g serverless
3. npm install --save serverless nodemon express body-parser cors aws-serverless-express

Create the Logic file 'server.js'

Create the Lambda Configuration file 'lambda.js'

Create Serverless COnfiguration File serverless.yml

Modify the Script in package.json

"scripts": {
"start": "nodemon local.js",
"deploy": "serverless deploy"
},

Deploy using the command

npm run deploy
