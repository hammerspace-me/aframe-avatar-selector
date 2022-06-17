const fs = require("fs");

const configAsString = `const config = {
  BACKPACK_BACKEND: "${process.env.BACKPACK_BACKEND}",
  EXPERIENCE: "${process.env.EXPERIENCE}",
};
`;

fs.writeFile("./src/js/config.js", configAsString, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("Config written: ", configAsString);
});
