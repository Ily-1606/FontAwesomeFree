const axios = require("axios");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// A `main` function so that you can use async/await
async function checkIcon(data) {
  const iconName = data.name;
  const type = data.type;
  const icons = await prisma.icons.findMany({
    where: {
      iconName,
      type,
    },
  });
  if (icons.length > 0) {
    // Exist icon
    // console.log("OK");
  } else {
    const data = {
      iconName,
      type,
      flagSave: false
    };
    const res = await prisma.icons.create({
      data,
    });
    if (res) {
    } else {
      throw new Error("Something went wrong!");
    }
  }
}
function buildQuery(params) {
  var data = {
    requests: [
      {
        indexName: "fontawesome_com-splayed-6.0.0",
        params,
      },
    ],
  };
  var config = {
    method: "post",
    url: "https://m19dxw5x0q-dsn.algolia.net/1/indexes/*/queries?x-algolia-api-key=c79b2e61519372a99fa5890db070064c&x-algolia-application-id=M19DXW5X0Q",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36",
      "content-type": "application/x-www-form-urlencoded",
    },
    data,
  };
  return config;
}
const types = ["solid", "regular", "light", "thin", "duotone"];
const categories = [];

async function fecthCategory() {
  const queryString =
    "hitsPerPage=1&distinct=true&facetFilters=%5B%5B%22type%3Aicon%22%5D%5D&maxValuesPerFacet=100&facets=%5B%22categories%22%5D&tagFilters=";
  const response = await axios(buildQuery(queryString));
  const results = response.data.results[0];
  const facets = results.facets;
  const categoriesRaw = facets.categories;
  for (let category in categoriesRaw) {
    categories.push(category);
  }
}
function delay(t, v) {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, v), t);
  });
}
async function execute() {
  for (let category of categories) {
    for (let type of types) {
      console.log(`Loading ${category} as style ${type}....`);
      const queryString = `hitsPerPage=1000&distinct=true&facetFilters=%5B%22categories%3A${category}%22%2C%22style%3A${type}%22%5D&highlightPreTag=__ais-highlight__&highlightPostTag=__%2Fais-highlight__&facets=%5B%5D&tagFilters=`;
      await delay(5000).then(async function () {
        const response =await axios(buildQuery(queryString));
        const results = response.data.results[0];
        const hits = results.hits;
        for (let element of hits) {
          console.log(element.name);
          const data = {
            name: element.name,
            type: element.style,
          };
          await checkIcon(data);
        }
      });
    }
  }
}
async function main() {
  await fecthCategory();
  console.log(categories);
  execute();
}
main();

// checkIcon('audio-description-slash', 'solid')
//   .catch((e) => {
//     throw e
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })
