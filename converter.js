import { createTimesheetResult, createTimesheetXLSX } from "./factory.js";
import { parse } from "csv-parse";
import fs from "fs";

const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));
const results = [];

fs.createReadStream(config.inputFile)
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
    }),
  )
  .on("data", (data) => {
    results.push(
      createTimesheetResult({
        data,
        config,
      }),
    );
  })
  .on("end", () => {
    createTimesheetXLSX(results, config);
  });
