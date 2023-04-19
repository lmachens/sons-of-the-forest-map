# Sons Of The Forest Map

Stay on top of the game Sons Of The Forest with real-time position tracking, nodes of weapons & points of interest, and overlay mode for seamless progress tracking.

![](/assets/screenshot2.jpg)

## Installation

Head over to the [Sons Of The Forest Map](https://www.overwolf.com/app/Leon_Machens-Sons_Of_The_Forest_Map) page on Overwolf and click the "Download" button.

You can also use the web-version of the app [here](https://sotf.th.gl), but you will not be able to use the position syncing feature.

Join the [Discord](https://discord.com/invite/NTZu8Px) to get the latest news and updates.

## Features

- Real-time position tracking
- Position streaming to mobile devices and tablets
- Group functionality to see each other on the map
- Trace routes
- Nodes of weapons and other points of interest
- Custom nodes
- Overlay mode for seamless progress tracking
- Easy to use and navigate while playing the game
- [Web version](https://sotf.th.gl) with position syncing

## Description

"Sons of the Forest Map" is an Overwolf app designed for the popular game "Sons of the Forest". With this app, you can track your position (and the positions of your friends) in real-time and trace routes with ease. It also allows you to discover nodes of weapons and other points of interest, making it easier to navigate through the game. Additionally, the overlay mode of the app ensures that you can keep track of your progress without leaving the game. With this app, you can stay on top of your game and enjoy an immersive gaming experience.

## Contributing

If you want to contribute to this project, please join the [Discord](https://discord.com/invite/NTZu8Px) and contact me (DevLeon#4001). I will be happy to help you get started.

## Development

1. Install Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PNPM](https://pnpm.js.org/en/installation)

2. Clone the repository
3. Install the dependencies with `pnpm install`
4. Start the development with `pnpm dev:web`

### Internationalization

The app supports multiple languages. If you want to add or update a language, please follow these steps:

### Add new language strings

The script in `scripts/i18n.mjs` will automatically extract all strings from the app and updates the locale files in `src/locales`.

#### Add a new language

Add the locale of the new language in `scripts/i18n.mjs` and run `pnpm i18n` to extract the strings of the app and create a new locale file in `src/locales`.
This will take a while, because the script uses Google Translate to translate the strings. Please check the new locale file and correct any mistakes.

#### Update an existing language

Update the locale files in `src/locales`.

## Authors

- **[DevLeon](https://github.com/lmachens)** - _Development_
- **[Borys21](https://github.com/Borys21)** - _Locations_

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
