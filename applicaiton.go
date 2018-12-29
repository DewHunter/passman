package main

import (
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/go-chi/chi"
)

func main() {

	port := os.Getenv("PASSMAN-PORT")
	if port == "" {
		port = "5000"
	}

	publicDir := os.Getenv("PASSMAN-PUBLIC-DIR")
	if publicDir == "" {
		publicDir = "passmanjs/dist"
	}

	log.Printf("Starting PassMan 🛡 Server on port %s\n\n", port)

	r := chi.NewRouter()

	r.Get("/randpassgen", GeneratePassword)

	FileServer(r, "/", http.Dir(publicDir))
	log.Printf("%s", http.ListenAndServe(":"+port, r))
}

// Placeholder generate random password and pretend to take time
func GeneratePassword(w http.ResponseWriter, r *http.Request) {
	time.Sleep(3 * time.Second)
	w.Write([]byte("{\"pass\": \"random-password\"}"))
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
