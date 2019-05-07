package main

import (
	"log"
	"net/http"
	"strings"

	"./passmango"
	"./passmango/config"
	"github.com/go-chi/chi"
)

func main() {
	configuration, err := config.New()
	if err != nil {
		log.Panicln("Configuration error", err)
	}

	log.Printf("Starting PassMan 🛡 Server\n\n")
	router := Routes(configuration)

	log.Fatalln(http.ListenAndServe(":"+configuration.Constants.PORT, router))
}

func Routes(configuration *config.Config) *chi.Mux {
	router := chi.NewRouter()

	router.Mount("/api", passmango.Routes(configuration))

	// Comment out to run API only server
	FileServer(router, "/", http.Dir(configuration.Constants.PUB_DIR))
	return router
}

// Taken from https://github.com/go-chi/chi/blob/master/_examples/fileserver/main.go
func FileServer(r chi.Router, path string, root http.FileSystem) {
	if strings.ContainsAny(path, "{}*") {
		panic("FileServer does not permit URL parameters.")
	}

	fs := http.StripPrefix(path, http.FileServer(root))

	if path != "/" && path[len(path)-1] != '/' {
		r.Get(path, http.RedirectHandler(path+"/", 301).ServeHTTP)
		path += "/"
	}
	path += "*"

	r.Get(path, http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fs.ServeHTTP(w, r)
	}))
}
