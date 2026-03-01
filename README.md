# How to use

## Toggl setup
- Set up projects on Toggl that follows a naming convention that includes the project name and the category
  - Project name does not have to match the project name on the timesheet portal exactly, just something to distinguish it from other projects
  - Categories should be the same as on the timesheet portal:
    <img width="504" height="346" alt="image" src="https://github.com/user-attachments/assets/53e47225-328f-40b4-9a2c-2867b8484600" />
    <img width="298" height="294" alt="image" src="https://github.com/user-attachments/assets/fedf4c23-0e84-43e3-aec8-fc39b4e67497" />


## Preparation
- Fork / Clone repository
- Export toggl tracking data
  - <img width="1399" height="953" alt="image" src="https://github.com/user-attachments/assets/acb6500b-b016-473b-8ef1-38d57453f3ed" />
- Rename the data export to align with the value of the **inputFile** config variable
- Move the data export into the repository folder
  - <img width="221" height="297" alt="image" src="https://github.com/user-attachments/assets/f861718c-66f8-4a41-b385-b8e667687ee6" />
- Change your configuration to suit your project
  - togglProject - Project name (see Toggl setup)
  - entelectProject - Project name on timesheet portal

    <img width="478" height="267" alt="image" src="https://github.com/user-attachments/assets/62056ac6-fab1-4693-8131-0c4fec5edc3a" />
  - projectCategories - Categories on timesheet portal

    <img width="2870" height="248" alt="image" src="https://github.com/user-attachments/assets/82a8fabe-b645-4bc6-8c2d-bba8ecb3e2fe" />
  - workedFromRules - Allocate the weekdays to whichever locations you frequent on those days
 
    <img width="517" height="137" alt="image" src="https://github.com/user-attachments/assets/1053d794-1678-4e33-9a7f-953a844de939" />

## Running the script
- Given the following:
  - Toggl is setup and entries have been made
  - Data export is inside repo folder and renamed to togglProject value
  - Config file is configured as necessary
- Then open a terminal in the root folder of the repo
- (First time only) Run 'node install'
- Run 'node converter.js'
- If all goes well, then a message like this will print in the terminal:
  - ✅ Conversion complete! File saved as: output/1772363689344/Converted_Timesheet.xlsx
- If all does not go well, then your entries probably include an entry that doesn't include the values of togglProject or projectCategories
  - Catering for multiple different types of projects is still on my TODO list 😊
 
## Importing on the timesheet portal (for those who don't know how)
- Under Timesheets > Import/Export
- <img width="1129" height="414" alt="image" src="https://github.com/user-attachments/assets/f6d2124f-8090-4e37-a39a-61cedc1355b1" />
- It should show you a breakdown of the imported timesheets per day, with checkboxes to choose which to upload or not
- Below that breakdown is a little save button - just hit that and _done!_ 🎉
