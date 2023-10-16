import * as fs from "fs";
import { resolve } from "path";

const config = {
  testImgPath: "./fs/testImg.png", // Enter img file path
  testFilePath: "./fs/testFile.md", // Enter test file path
  newContent: "# Test File", // Enter content
};

// Run node fs

export class FS {
  constructor() {}

  writeFile(filePath: string, json: any): Promise<void> {
    const resolvedPath = resolve(filePath);
    return new Promise((resolve, reject) => {
      fs.writeFile(
        resolvedPath,
        JSON.stringify(json, null, 2),
        "utf-8",
        function (err) {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  readFile(filePath: string): Promise<string> {
    const resolvedPath = resolve(filePath);
    return new Promise((resolve, reject) => {
      fs.readFile(resolvedPath, "ascii", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  readImg(filePath: string): Promise<Buffer> {
    const resolvedPath = resolve(filePath);
    return new Promise((resolve, reject) => {
      const buffer = fs.readFileSync(resolvedPath);
      const base64 = Buffer.from(buffer).toString("base64");
      resolve(Buffer.from(base64, "base64"));
    });
  }
}


// Test
const newFs = new FS();
newFs.readFile(config.testFilePath)
  .then((readmeFile) => console.log('%readmeFile', readmeFile, '\n'));

newFs.writeFile(config.testFilePath, config.newContent)
  .then(() => { console.log('%writeFile', '\n') });

newFs.readImg(config.testImgPath)
  .then((readImg) => console.log('%readImg', readImg, '\n'));