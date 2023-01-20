import path from "path";
import xlsx from "xlsx";

const fileName = "LOCAL_PEOPLE_GU_2021.csv";

export const excelFile = xlsx.readFile("../files/region-code.xlsx");
export const csv = path.join(__dirname, "../files", "files", fileName);
