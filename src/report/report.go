package report

import (
	"encoding/csv"
	"log"
	"os"
	"strconv"
)

type Employee struct {
	ID  string
	Age int
}

func GenerateReport() {
	records := []Employee{
		{"E01", 25},
		{"E02", 26},
		{"E03", 24},
		{"E04", 26},
	}
	file, err := os.Create("report.csv")

	if err != nil {
		log.Fatalln("failed to open file", err)
	}
	defer file.Close()
	w := csv.NewWriter(file)

	// Using Write
	for _, record := range records {
		row := []string{record.ID, strconv.Itoa(record.Age)}
		if err := w.Write(row); err != nil {
			log.Fatalln("error writing record to file", err)
		}
	}
	defer w.Flush()

	// Using WriteAll
	var data [][]string
	for _, record := range records {
		row := []string{record.ID, strconv.Itoa(record.Age)}
		data = append(data, row)
	}
	w.WriteAll(data)
}
