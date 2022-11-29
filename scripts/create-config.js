const fs = require("fs");

const configAsString = `const config = {
  HAMMERSPACE_BACKEND: "${process.env.HAMMERSPACE_BACKEND}",
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
