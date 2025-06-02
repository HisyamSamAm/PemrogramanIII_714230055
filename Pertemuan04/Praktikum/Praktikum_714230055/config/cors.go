package config

var allowedOrigins = []string{
	"http://localhost:5173",
	"http://HisyamSamAm.github.io",
}

func GetAllowedOrigins() []string {
	return allowedOrigins
}
