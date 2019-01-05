package passmango

import (
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
	return router
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
