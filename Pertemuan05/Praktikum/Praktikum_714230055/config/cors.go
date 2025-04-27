package config

var allowedOrigins = []string{
	"http://localhost:8080",
	"http://HisyamSamAm.github.io",
}

func GetAllowedOrigins() []string {
	return allowedOrigins
}
