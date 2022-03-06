
# Free Fontaweseome

Get and download svg from Fontaweseome

For vietnamese peoles: [README-VN.md](/README-VN.md)


## Chrome extension

Open [extension page](about://extensions/)

Enable Develop mode

Drag and drop extension folder into extension page

## Usage

Open icon, example: https://fontawesome.com/icons/ban-bug?s=solid

Click to icon extension

Ctrl + U to get source svg or Download it.

Enjoy!

# For contributor

## Get all icon with script

Current project using prisma + mongodb

Clone the project

Please clone .env to .env.local, and replace URI drive mongodb into DATABASE_URL

Install dependencies

```bash
  npm install
```

Add data icon to mongodb

```bash
  npm run crawl
```

After task run finished, download svg file with commandline

```bash
  npm run load
```

About, this task run in few hours.

Enjoy!
## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Authors

- [@Ily1606](https://www.facebook.com/Ily1606)

