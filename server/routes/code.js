const express = require("express");
const router = express.Router();
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Створюємо тимчасову директорію для файлів, якщо вона не існує
const tempDir = path.join(__dirname, "../temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

router.post("/execute", async (req, res) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res
      .status(400)
      .json({ error: "Необхідно надати код та мову програмування" });
  }

  const fileId = uuidv4();
  let fileName, command;

  // Визначаємо розширення файлу та команду для виконання
  if (language === "python") {
    fileName = `${fileId}.py`;
    command = "python3";
  } else if (language === "cpp") {
    fileName = `${fileId}.cpp`;
    command = "g++";
  } else {
    return res.status(400).json({ error: "Непідтримувана мова програмування" });
  }

  const filePath = path.join(tempDir, fileName);

  try {
    // Записуємо код у файл
    fs.writeFileSync(filePath, code);

    if (language === "cpp") {
      // Компілюємо C++ код
      const compiledFile = path.join(tempDir, fileId);
      await new Promise((resolve, reject) => {
        exec(
          `${command} ${filePath} -o ${compiledFile}`,
          (error, stdout, stderr) => {
            if (error) {
              reject({ error: stderr });
            }
            resolve();
          }
        );
      });

      // Виконуємо скомпільований файл
      const result = await new Promise((resolve, reject) => {
        exec(`./${compiledFile}`, (error, stdout, stderr) => {
          if (error) {
            reject({ error: stderr });
          }
          resolve({ output: stdout });
        });
      });

      // Видаляємо скомпільований файл
      fs.unlinkSync(compiledFile);
      res.json(result);
    } else {
      // Виконуємо Python код
      const result = await new Promise((resolve, reject) => {
        exec(`${command} ${filePath}`, (error, stdout, stderr) => {
          if (error) {
            reject({ error: stderr });
          }
          resolve({ output: stdout });
        });
      });
      res.json(result);
    }
  } catch (error) {
    res.status(500).json(error);
  } finally {
    // Видаляємо вихідний файл
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
});

module.exports = router;
