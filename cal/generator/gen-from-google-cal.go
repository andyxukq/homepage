package main

import (
	. "./utils"

	"bytes"
	"fmt"
	"io/ioutil"
	"log"
	"time"

	"golang.org/x/net/context"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/calendar/v3"
)

func generateSchedule(events *calendar.Events, location *time.Location, zonename string, start, end time.Time) bytes.Buffer {
	var schedule bytes.Buffer
	schedule.WriteString(fmt.Sprintf(
		"The calendar listed here is in **%s (UTC%s)**. \n\n %s \n\n",
		zonename,
		start.In(location).Format("-07:00"),
		"View this calendar in [China Standard Time](/cal/china), [Pacific Time](/cal/pacific) or [Eastern Time](/cal/eastern).",
	))

	timeDelta, _ := time.ParseDuration(start.In(location).Format("-07h"))
	fmt.Println("start", start, end)
	start, end = start.Add(-timeDelta), end.Add(-timeDelta)
	fmt.Println(timeDelta, start.In(location), end.In(location))

	if len(events.Items) == 0 {
		schedule.WriteString(fmt.Sprintf("No upcoming events found.\n\n"))
	} else {
		for start.Before(end) {
			dayStart := start
			dayEnd := start.Add(24 * time.Hour)

			var todayEvents bytes.Buffer
			for _, i := range events.Items {
				var when, whenEnd time.Time
				allDay := false
				if i.Start.DateTime != "" {
					when, _ = time.Parse(time.RFC3339, i.Start.DateTime)
					if i.EndTimeUnspecified {
						whenEnd = when.Add(time.Hour)
					} else {
						whenEnd, _ = time.Parse(time.RFC3339, i.End.DateTime)
					}
				} else {
					when, _ = time.Parse("2006-01-02", i.Start.Date)
					allDay = true
				}
				if allDay {
					continue
				}
				if when.After(dayStart) && when.Before(dayEnd) {
					record := fmt.Sprintf("`%s` %s", func() string {
						if allDay {
							return "All day"
						}
						fmt.Println(when.In(location), i.Summary)
						return fmt.Sprintf("%s - %s%s",
							when.In(location).Format("15:04"),
							whenEnd.In(location).Format("15:04"),
							func(nextDay bool) string {
								if nextDay {
									return "(+1)"
								}
								return ""
							}(whenEnd.After(dayEnd)),
						)
					}(),
						" "+i.Summary+"\n\n",
					)
					todayEvents.WriteString(record)
				}
			}
			if todayEvents.String() != "" {
				schedule.WriteString("#### " + start.Format("Monday, Jan. 2"+DateSuffix(dayStart)+", 2006") + "\n\n")
				schedule.Write(todayEvents.Bytes())
			}
			start = dayEnd
		}
	}

//	schedule.WriteString(fmt.Sprintf("\n-----\n*Last updated on %s*\n\n",
//		time.Now().In(location).Format("Monday, Jan. 2"+DateSuffix(time.Now().In(location))+", 2006 15:04 MST")))
	schedule.WriteString("\n-----\n*The calendar was automatically generated. For calendar invitations, please send to andyxukq@gmail.com .*\n")
	return schedule
}

func main() {
	ctx := context.Background()

	b, err := ioutil.ReadFile("client_secret.json")
	if err != nil {
		log.Fatalf("Unable to read client secret file: %v", err)
	}

	// If modifying these scopes, delete your previously saved credentials
	// at ~/.credentials/calendar-go-quickstart.json
	config, err := google.ConfigFromJSON(b, calendar.CalendarReadonlyScope)
	if err != nil {
		log.Fatalf("Unable to parse client secret file to config: %v", err)
	}
	client := GetClient(ctx, config)

	srv, err := calendar.New(client)
	if err != nil {
		log.Fatalf("Unable to retrieve calendar Client %v", err)
	}

	locationChina, _ := time.LoadLocation("Asia/Shanghai")
	locationCalifonia, _ := time.LoadLocation("America/Los_Angeles")
	locationNewYork, _ := time.LoadLocation("America/New_York")

	timeOffset := time.Duration(12 * time.Hour)
	start := time.Now().In(locationChina).Truncate(24 * time.Hour).Add(-24 * time.Hour)
	end := time.Now().In(locationChina).Truncate(24 * time.Hour).Add(2 * 7 * 24 * time.Hour)
	t := start.Add(-timeOffset).Format(time.RFC3339)
	t_end := end.Add(timeOffset).Format(time.RFC3339)

	events, err := srv.Events.List("primary").ShowDeleted(false).SingleEvents(true).
		TimeZone("UTC").
		TimeMin(t).TimeMax(t_end).MaxResults(50).OrderBy("startTime").Do()
	if err != nil {
		log.Fatalf("Unable to retrieve the user's events. %v", err)
	}

	events2, err := srv.Events.List("kuh7d2oorb38gnpij24cf4stb0@group.calendar.google.com").ShowDeleted(false).SingleEvents(true).
		TimeZone("UTC").
		TimeMin(t).TimeMax(t_end).MaxResults(50).OrderBy("startTime").Do()
	if err != nil {
		log.Fatalf("Unable to retrieve the user's events. %v", err)
	}
        for _, i := range events2.Items {
		i.Summary = "Private event"
	}
	events.Items = append(events.Items, events2.Items...)

	schedule := generateSchedule(
		events,
		locationChina,
		"China Standard Time",
		start, end,
	)

	schedule2 := generateSchedule(
		events,
		locationCalifonia,
		"Pacific Time",
		start, end,
	)

	schedule3 := generateSchedule(
		events,
		locationNewYork,
		"Eastern Time",
		start, end,
	)

	index := schedule

	ioutil.WriteFile("./index.md", index.Bytes(), 0644)
	ioutil.WriteFile("./china.md", schedule.Bytes(), 0644)
	ioutil.WriteFile("./pacific.md", schedule2.Bytes(), 0644)
	ioutil.WriteFile("./eastern.md", schedule3.Bytes(), 0644)

	log.Println("Calendar schedule exported.")
}
