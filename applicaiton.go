package main

import (
	"log"
	"net/http"
	"os"
)

func main() {

	port := os.Getenv("PASSMAN-PORT")
	if port == "" {
		port = "5000"
	}

	publicDir := os.Getenv("PASSMAN-PUBLIC-DIR")
	if publicDir == "" {
		publicDir = "public"
	}

	log.Printf("Starting PassMan 🛡 Server on port %s\n\n", port)

	http.Handle("/", http.FileServer(http.Dir(publicDir)))

	log.Printf("%s", http.ListenAndServe(":"+port, nil))
}
