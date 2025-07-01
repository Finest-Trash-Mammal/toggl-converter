const fs = require("fs");
const { parse } = require("csv-parse");
const XLSX = require("xlsx");

// Input/Output file paths
const togglFile = "toggl.csv";
const outputFile = "Converted_Timesheet.xlsx";

// Read CSV and process entries
const results = [];

fs.createReadStream(togglFile)
  .pipe(
    parse({
      columns: true,
      trim: true,
      skip_empty_lines: true,
      bom: true,
      relax_quotes: true,
      relax_column_count: true,
      quote: '"',
      escape: '"',
    })
  )
  .on("data", (data) => {
    const startDate = new Date(data["Start date"]);
    console.log(Object.keys(data));
    let project = "";
    if (data["Project"].includes("Munich RE")) {
      project = "R - Munich Re - TAU and CLARA";
    }

    let category = "";
    if (data["Project"].includes("Development")) category = "Development";
    else if (data["Project"].includes("Admin")) category = "Admin";
    else if (data["Project"].includes("Analysis")) category = "Analysis";
    else if (data["Project"].includes("Meetings")) category = "Meetings";

    // Parse Duration (Format: "HH:MM:SS" or "H:MM:SS")
    const durationParts = data["Duration"].split(":");
    let hours = parseInt(durationParts[0]);
    let minutes = parseInt(durationParts[1]);

    // Determine WorkedFrom
    const weekday = startDate.toLocaleString("en-US", { weekday: "long" });
    const workedFrom =
      weekday === "Tuesday" || weekday === "Thursday" ? "Entelect" : "Home";

    results.push({
      Date: startDate.toISOString().split("T")[0],
      Project: project,
      Category: category,
      Hours: hours,
      Minutes: minutes,
      Billable: "Yes",
      Description: data["Description"],
      TicketNumber: "",
      Sentiment: "Neutral",
      WorkedFrom: workedFrom,
    });
  })
  .on("end", () => {
    // Write to Excel
    const worksheet = XLSX.utils.json_to_sheet(results);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, outputFile);

    console.log(`✅ Conversion complete! File saved as: ${outputFile}`);
  });
