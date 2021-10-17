import Province from "../models/Province.js";
import {Frequency, TransitMethod} from "../models/Transit.js";
import fs from 'fs'
import assert from "../utils/dev.js";
import {getFilePath} from "../utils/utils.js";

function createFromJson(path, model) {
  fs.readFile(getFilePath(import.meta.url, path), 'utf-8', (err, jsonString) => {
    assert(jsonString, err?.message);
    const data = JSON.parse(jsonString);
    model.bulkCreate(data);
  });
}

export default function setUpData() {
  createFromJson('./data/ProvinceData.json', Province);
  createFromJson('./data/TransitMethodsData.json', TransitMethod);
}