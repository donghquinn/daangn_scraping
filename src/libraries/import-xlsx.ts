import xlsx from "xlsx";
import fs from "fs";
import path from "path";

const fileName = "LOCAL_PEOPLE_GU_2021.csv";

const excelFile = xlsx.readFile("../files/region-code.xlsx");
const csv = path.join(__dirname, "../files", "files", fileName);
