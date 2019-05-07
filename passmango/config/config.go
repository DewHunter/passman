package config

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

type Constants struct {
	PORT      string
	PUB_DIR   string
	TableName string
}

type Config struct {
	Constants
	DDB *dynamodb.DynamoDB
}

func New() (*Config, error) {
	config := Config{}
	config.Constants = Constants{
		PORT:      "5000",
		PUB_DIR:   "passmanjs/dist",
		TableName: "Guacamole",
	}

	awsConfig := aws.Config{
		Region:   aws.String("us-west-2"),
		Endpoint: aws.String("http://localhost:8000"),
	}

	session, err := session.NewSession(&awsConfig)
	if err != nil {
		return &config, err
	}

	config.DDB = dynamodb.New(session, &awsConfig)

	return &config, nil
}
