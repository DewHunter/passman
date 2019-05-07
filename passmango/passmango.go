package passmango

import (
	"crypto/rand"
	"crypto/sha1"
	"encoding/base64"
	"encoding/json"
	"log"
	"net/http"

	"./config"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/go-chi/chi"
	"github.com/go-chi/render"
)

func Routes(config *config.Config) chi.Router {
	r := chi.NewRouter()

	r.Use(render.SetContentType(render.ContentTypeJSON))
	r.Use(UserValidation)

	r.Get("/listTables", listTables(config))
	r.Post("/putItem", putItem(config))
	r.Get("/getNewId", getNewID())
	return r
}

// Middleware to validate users
func UserValidation(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		t := r.Header.Get("Auth-Token")
		if t != "123456" {
			log.Printf("ERROR: Rejecting forbidden request, %s", r.Header)
			http.Error(w, http.StatusText(http.StatusForbidden), http.StatusForbidden)
			return
		}

		next.ServeHTTP(w, r)
	})
}

type item struct {
	OwnerID  string            `json:"ownerid"`
	EntryID  string            `json:"entryid"`
	Secrets  map[string]string `json:"secrets"`
	Metadata map[string]string `json:"metadata"`
}

/**
 * Test like this:
 *  curl -X POST localhost:5000/api/putItem -d '{"ownerid":"12345","entryid":"12355"}'
 */
func putItem(configuration *config.Config) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		resp := make(map[string]string)
		jdec := json.NewDecoder(r.Body)

		var item item
		jdec.Decode(&item)

		log.Printf("Req: %s and %s!\n", item.OwnerID, item.EntryID)

		if item.Secrets != nil {
			log.Printf("secrets: %s ", item.Secrets)
		}

		if item.Metadata != nil {
			log.Printf("metadata: %s\n", item.Metadata)
		}

		req := &dynamodb.PutItemInput{
			Item:      ddbfy(item),
			TableName: aws.String("Guacamole"),
		}

		ddbRes, err := configuration.DDB.PutItem(req)
		if err != nil {
			log.Printf("ERROR: %s\n", err.Error())
			resp["error"] = "Internal Error occured."
		} else {
			resp["msg"] = "ok"
		}

		log.Printf("DDB: %s AND %s\n", ddbRes.Attributes, ddbRes.ConsumedCapacity)
		render.JSON(w, r, resp)
	}
}

func ddbfy(item item) map[string]*dynamodb.AttributeValue {
	return map[string]*dynamodb.AttributeValue{
		"OwnerID": {
			S: aws.String(item.OwnerID),
		},
		"EntryID": {
			S: aws.String(item.EntryID),
		},
		"Metadata": {
			M: ddbfyMetaData(item.Metadata),
		},
	}
}

func ddbfyMetaData(md map[string]string) map[string]*dynamodb.AttributeValue {
	ddbMd := make(map[string]*dynamodb.AttributeValue)

	for k, v := range md {
		awsVal := &dynamodb.AttributeValue{
			S: aws.String(v),
		}
		ddbMd[k] = awsVal
	}

	return ddbMd
}

func listTables(configuration *config.Config) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		result, err := configuration.DDB.ListTables(&dynamodb.ListTablesInput{})
		if err != nil {
			panic(err)
		}

		render.JSON(w, r, aws.StringValueSlice(result.TableNames))
	}
}

func getNewID() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		resp := make(map[string]string)
		resp["id"] = genIDString()
		render.JSON(w, r, resp)
	}
}

func genIDString() string {

	randBytes := make([]byte, 4)
	_, err := rand.Read(randBytes)
	if err != nil {
		log.Printf("Error while trying to read rand bytes")
		panic(err)
	}

	shaVal := sha1.Sum(randBytes)
	byteSlice := shaVal[:]
	idString := base64.StdEncoding.EncodeToString(byteSlice)

	return idString
}
