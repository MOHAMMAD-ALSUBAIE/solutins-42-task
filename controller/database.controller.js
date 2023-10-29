import { Database } from "bun:sqlite";
import fs from "fs";
import csvParser from "csv-parser";
import { json } from "express";
const db = new Database("mydb.sqlite", { create: true });
const query = db.query(`select * from AccountRequest
`);
const results = [];

export const distributing = (req, res) => {
 // callDeleteEveryThings(); //if there are previous records that stored before ,then will remove from database
  const startOperation = Date.now();

  fs.createReadStream("./file/CSV.csv")
    .pipe(csvParser())
    .on("data", (data) => results.push(data))
    .on("end", () => {
   
      results.forEach((row) => {
        const RequestDataObject = JSON.parse(row.RequestData);

        if (row.RequestType == "1") {
         const stmt=  db.prepare(
            `INSERT INTO NewLicense(CompanyName, LicenceType, IsOffice, OfficeName, OfficeServiceNumber, RequestDate, Activities) 
            VALUES(?, ?, ?, ?, ?, ?, ?)`
          )
          stmt.run(
            RequestDataObject.CompanyName,
            RequestDataObject.LicenceType,
            RequestDataObject.IsOffice,
            RequestDataObject.OfficeName,
            RequestDataObject.OfficeServiceNumber,
            RequestDataObject.RequestDate,
            RequestDataObject.Activities
          )
        } else if (row.RequestType == "2") {
          const stmt = db.prepare(
            "INSERT INTO AccountRequest (CompanyName, RequesterName, ApplicantName, UserName, ContactEmail, Permissions) " +
              "VALUES (?, ?, ?, ?, ?, ?)"
          );

          stmt.run(
            RequestDataObject.CompanyName,
            RequestDataObject.RequesterName,
            RequestDataObject.ApplicantName,
            RequestDataObject.UserName,
            RequestDataObject.ContactEmail,
            RequestDataObject.Permissions + ""
          );
        } else if (row.RequestType == "3") {
          const stmt =
            db.prepare(`INSERT INTO InspectionRequest (CompanyName, InspectionDate, InspectionTime, InspectionType) 
          VALUES (?, ?, ?, ?)`);
          stmt.run(
            RequestDataObject.CompanyName,
            RequestDataObject.InspectionDate,
            RequestDataObject.InspectionTime,
            RequestDataObject.InspectionType
          );
        } else if (row.RequestType == "4") {
          const stmt = db.prepare(
            "INSERT INTO AddActivity(CompanyName, LicenceID, Activities) VALUES (?, ?, ?)"
          );
          stmt.run(
            RequestDataObject.CompanyName,
            RequestDataObject.LicenceID,
            RequestDataObject.Activities + ""
          );
        } else if (row.RequestType == "5") {
          const stmt = db.prepare(
            "INSERT INTO StampLicense(companyName, LicenceID, RequestDate) VALUES (?, ?, ?)"
          );

          stmt.run(
            RequestDataObject.CompanyName,
            RequestDataObject.LicenceID,
            RequestDataObject.RequestDate
          );
        }
      });
      const EndOperation = Date.now() - startOperation;
      const NewLicenseRows = CountRows("NewLicense");

      const AccountRequestRows = CountRows("AccountRequest");

      const InspectionRequestRows = CountRows("InspectionRequest");
      const AddActivityRows = CountRows("AddActivity");
      const StampLicenseRows = CountRows("StampLicense");

      const operationTime = new Date(EndOperation).getSeconds();
    const data=  {
        Time: operationTime + " seconds",
        NewLicense:NewLicenseRows[0]["count(*)"],
        AccountRequest:AccountRequestRows[0]["count(*)"],
        InspectionRequest:InspectionRequestRows[0]["count(*)"],
        AddActivity:AddActivityRows[0]["count(*)"],
        StampLicense:StampLicenseRows[0]["count(*)"],
      }
      console.log(data)
      res.render('./table', {data})
    });

};
function deleteEveryThings(tableName) {
  const a = CountRows(tableName);

  const count = a[0]["count(*)"];
  if (count > 1) {
    db.query(`delete from ${tableName}`).run();
  }
}

function callDeleteEveryThings() {
  deleteEveryThings("NewLicense");
  deleteEveryThings("AccountRequest");
  deleteEveryThings("InspectionRequest");
  deleteEveryThings("AddActivity");
  deleteEveryThings("StampLicense");
}

function CountRows(tableName) {
  return db.query(`select count(*) from ${tableName}`).all();
}
