export function determineWorkedFrom(date, workedFromRules) {
  const weekday = date.toLocaleString("en-GB", {
    weekday: "long",
  });
  const rules = workedFromRules;
  const defaultLocation = "Home";

  for (const [location, days] of Object.entries(rules)) {
    if (days.includes(weekday)) return location;
  }

  return defaultLocation;
}

export function determineProject(data, togglProject, entelectProject) {
  const project = data["Project"].includes(`${togglProject}`)
    ? entelectProject
    : "";

  if (!project)
    throw new Error(
      "No entelect project found that corrosponds to toggl project",
    );

  return project;
}

export function determineCategory(data, projectCategories) {
  const category = projectCategories.find((category) =>
    data["Project"].includes(category),
  );
  if (!category) throw new Error("No matching entelect category found");

  return category;
}