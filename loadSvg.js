const axios = require("axios");
const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function getIcon() {
  const totalRecord = await prisma.icons.count({
    where: {
      flagSave: false,
    },
  });
  const totalPage = Math.ceil(totalRecord / 100);
  for (let i = 0; i < totalPage; i++) {
    const page = i;
    const skip = page * 100;
    const icons = await prisma.icons.findMany({
      where: {
        flagSave: false,
      },
      skip,
      take: 100,
    });
    for (let i = 0; i < icons.length; i++) {
      const icon = icons[i];
      console.log(`Downloading svg name ${icon.iconName}, style ${icon.type}`);
      const result = await loaderSvg(icon["iconName"], icon["type"]);
      fs.writeFile(
        `./dist/${icons[i].type}/${icons[i].iconName}.svg`,
        result,
        function (err) {
          if (err) {
            return console.log(err);
          }
          console.log("The file was saved!");
        }
      );
      const res = await prisma.icons.update({
        where: {
          id: icon.id,
        },
        data: {
          flagSave: true,
        },
      });
    }
  }
}
function checkDir() {
  const styles = ["solid", "regular", "light", "thin", "duotone"];
  if (!fs.existsSync(`./dist/`)) {
    fs.mkdirSync(`./dist/`);
  }
  styles.forEach((style) => {
    if (!fs.existsSync(`./dist/${style}`)) {
      fs.mkdirSync(`./dist/${style}`);
    }
  });
}
checkDir();

getIcon();
function delay(t, v) {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, v), t);
  });
}
async function loaderSvg(nameSvg, style) {
  const config = {
    method: "get",
    url: `https://site-assets.fontawesome.com/releases/v6.0.0/svgs/${style}/${nameSvg}.svg`,
  };
  const result = await axios(config);
  return result.data;
}
