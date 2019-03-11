package passmango

import (
	"encoding/json"
	"log"
	"net/http"

	"./config"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/go-chi/chi"
	"github.com/go-chi/render"
)

func Routes(config *config.Config) *chi.Mux {
	router := chi.NewRouter()
	router.Get("/listTables", ListTables(config))
	router.Get("/randpassgen", GeneratePassword)
	router.Post("/putItem", PutItem(config))
	return router
}

type item_struct struct {
	OwnerId string `json:"ownerid"`
	EntryId string `json:"entryid"`
}

/**
 * Test like this:
 *  curl -X POST localhost:5000/api/putItem -d '{"ownerid":"12345","entryid":"12355"}'
 */
func PutItem(configuration *config.Config) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		jdec := json.NewDecoder(r.Body)

		var item item_struct
		jdec.Decode(&item)

		log.Printf("Req: %s and %s!\n", item.OwnerId, item.EntryId)

		resp := make(map[string]string)
		resp["resp"] = "you're good"

		render.JSON(w, r, resp)
	}
}

func ListTables(configuration *config.Config) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		result, err := configuration.DDB.ListTables(&dynamodb.ListTablesInput{})
		if err != nil {
			panic(err)
		}

		render.JSON(w, r, aws.StringValueSlice(result.TableNames))
	}
}

// Placeholder generate random password and pretend to take time
func GeneratePassword(w http.ResponseWriter, r *http.Request) {

	resp := make(map[string]string)
	resp["pass"] = "random-password"

	render.JSON(w, r, resp)
}
