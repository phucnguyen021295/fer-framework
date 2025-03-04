const fs = require("fs");
const path = require("path");

// Đọc package.json gốc
const pkg = require("./package.json");

// Tạo package.json mới cho thư mục lib
const libPkg = { ...pkg };

// Sửa main và types
libPkg.main = "index.js";
libPkg.types = "index.d.ts";

// Sửa exports nếu có
if (libPkg.exports) {
  const newExports = {};

  for (const [key, value] of Object.entries(libPkg.exports)) {
    if (typeof value === "object") {
      newExports[key] = {};
      for (const [format, path] of Object.entries(value)) {
        newExports[key][format] = path.replace("./lib/", "./");
      }
    } else {
      newExports[key] = value.replace("./lib/", "./");
    }
  }

  libPkg.exports = newExports;
}

// Đảm bảo thư mục lib tồn tại
if (!fs.existsSync("lib")) {
  fs.mkdirSync("lib", { recursive: true });
}

// Ghi file package.json mới vào thư mục lib
fs.writeFileSync(
  path.join(__dirname, "lib", "package.json"),
  JSON.stringify(libPkg, null, 2)
);

// Copy các file khác nếu cần
["README.md", "LICENSE"].forEach((file) => {
  if (fs.existsSync(file)) {
    try {
      fs.copyFileSync(file, path.join(__dirname, "lib", file));
    } catch (err) {
      console.warn(`Warning: Could not copy ${file}`);
    }
  }
});

console.log("Successfully prepared lib directory for publishing");
