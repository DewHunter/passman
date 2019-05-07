# PassMan :shield:

Family password manager

## Development

### Dependencies

- https://github.com/ricmoo/aes-js
- https://vuetifyjs.com
- https://aws-amplify.github.io/docs/js/vue

### To run production version

```
cd passmanjs
npm install
npm run build
cd ../
go run application.go
```

### To run development stack for the vue based UI

```
cd passmanjs
npm install
npm run serve

cd passmanlogin
npm install
npm run serve
```

### Running DDB dev environment

Download desktop version from here: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html

```
// Run fake DDB local program
java -D"java.library.path=./DynamoDBLocal_lib" -jar DynamoDBLocal.jar -sharedDb

// run aws commands like this
aws dynamodb list-tables --endpoint-url http://localhost:8000

aws dynamodb --region us-east-1 --endpoint-url http://localhost:8000 create-table --table-name Guacamole --attribute-definitions AttributeName=OwnerID,AttributeType=S AttributeName=EntryID,AttributeType=S --key-schema AttributeName=OwnerID,KeyType=HASH AttributeName=EntryID,KeyType=RANGE --provisioned-throughput ReadCapacityUnits=10,WriteCapacityUnits=10

aws dynamodb --endpoint-url http://localhost:8000 put-item --table-name Guacamole --item file://item.json
aws dynamodb --endpoint-url http://localhost:8000 scan --table-name Guacamole

// Get a single item from table, both hash and range keys are required
aws dynamodb get-item --endpoint-url http://localhost:8000 --table-name Guacamole --key file://key.json

// Get all items with the same hash key:
aws dynamodb query --endpoint-url http://localhost:8000 --table-name Guacamole --key-condition-expression "OwnerID = :owner" --expression-attribute-values file://expression-attributes.json
--projection-expression "EntryID"
```

### AWS Cognito information

SignIn URL:
https://passman.auth.us-west-2.amazoncognito.com/login?response_type=code&client_id=79q2prquo1n5diibu84urr0sef&redirect_uri=https://example.com
