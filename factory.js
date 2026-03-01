import XLSX from "xlsx";
import fs from "fs";
import {
  determineWorkedFrom,
  determineProject,
  determineCategory,
} from "./resolver.js";

export function createTimesheetResult({ data, config }) {
  const durationParts = data["Duration"].split(":");
  const startDate = new Date(data["Start date"]);
  return {
    Date: startDate.toISOString().split("T")[0],
    Project: determineProject(data, config.togglProject, config.entelectProject),
    Category: determineCategory(data, config.projectCategories),
    Hours: parseInt(durationParts[0]),
    Minutes: parseInt(durationParts[1]),
    Billable: config.defaults.Billable,
    Description: data.Description,
    TicketNumber: config.defaults.TicketNumber,
    Sentiment: config.defaults.Sentiment,
    WorkedFrom: determineWorkedFrom(startDate, config.workedFromRules),
  };
}

export function createTimesheetXLSX(results, config) {
  const outputDir = `${config.outputDir}/${Date.now()}`;
  const outputFile = `${outputDir}/Converted_Timesheet.xlsx`;

  fs.mkdirSync(outputDir, { recursive: true });
  if (!fs.existsSync(config.historicalDir)) {
    fs.mkdirSync(config.historicalDir);
  }
  fs.renameSync(config.inputFile, `${config.historicalDir}/toggl.csv`);

  const worksheet = XLSX.utils.json_to_sheet(results);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, outputFile);

  console.log(`✅ Conversion complete! File saved as: ${outputFile}`);
}
