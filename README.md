# PassMan :shield:

Family password manager

## Development

### To run production version

```
cd passmanjs
npm install
npm run build
go run application.go
```

### To run development stack for the vue based UI

```
cd passmanjs
npm install
npm run serve
```

### Running DDB dev environment

Download desktop version from here: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html

```
// Run fake DDB local program
java -D"java.library.path=./DynamoDBLocal_lib" -jar DynamoDBLocal.jar

// run aws commands like this
aws dynamodb list-tables --endpoint-url http://localhost:8000

aws dynamodb --endpoint-url http://localhost:8000 create-table --table-name Guacamole --attribute-definitions AttributeName=OwnerID,AttributeType=S AttributeName=EntryID,AttributeType=S --key-schema AttributeName=OwnerID,KeyType=HASH AttributeName=EntryID,KeyType=RANGE --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1

aws dynamodb --endpoint-url http://localhost:8000 put-item --table-name Guacamole --item file://item.json
aws dynamodb --endpoint-url http://localhost:8000 scan --table-name Guacamole
```
