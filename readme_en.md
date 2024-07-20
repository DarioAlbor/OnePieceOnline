# 🍖🏴‍☠️ One Piece Online

[Spanish](readme.md) <img src="https://flagicons.lipis.dev/flags/4x3/ar.svg" width="20"/> / [English](readme_en.md) <img src="https://flagicons.lipis.dev/flags/4x3/us.svg" width="20"/>

## 📖 About the Project

This project is a **Web Scraping** service for *AnimeFLV* to obtain all the episodes of One Piece and subsequently their IFrame tag depending on the selected player.

## 🧠 Algorithm

- Lists all episodes by taking the most recent one from the AnimeFLV page.
- The episodes that are not obtained in the first scraping (because the web generates them as you scroll) are manually generated in the JSON response by the controller `getepisodecontroller.js` following the logic of the previous ones.
- When a controller is selected, the link of the same is entered and the main IFrame is obtained.
- If the main player does not work, the others can be obtained by scraping the option tags to get the IFrame according to the selected option.
- Search, pagination, and sorting buttons have been implemented for better organization of the episodes. This also prevents the page from being overloaded.

## 💻 Technologies Used

Backend:
- **Framework:** Node.js
- **Scraping:** Puppeteer
- **Package Manager:** NPM

Frontend:
- **Library:** React
- **UI Components:** ChakraUI
- **Package Manager:** NPM

## 🚀 How to Deploy

### Clone the Repository

1. Clone the repository from GitHub: `git clone https://github.com/DarioAlbor/OnePieceOnline.git`
2. Navigate to the project directory: `cd OnePieceOnline`

### Set Up and Start the Server

1. Navigate to the server directory: `cd backend`
2. Install the dependencies: `npm install`
4. Start the server: `npm start`

### Set Up and Start the Client

1. Navigate to the client directory: `cd frontend`
2. Install the dependencies: `npm install`
3. Navigate through the files `./pages/index.jsx`, `./components/episodemodal.jsx` and modify the URL to your backend.
4. Start the client: `npm start`

Enjoy!

## ✨ Deployed Using

Frontend: [Vercel](https://vercel.com)
Backend: [Render](https://render.com)

## 📬 Contact

You can contact me through my [portfolio](https://darioalbor.dev.ar).

You can also contribute to the project by adding new ideas or lines of code. Any help is welcome!

## 📸 Images

| ![Home](./imagesgit/1.png) | ![Episode Selection](./imagesgit/2.png) |
|:------------------------------------------:|:----------------------------------------------------:|
| Home                         | Episode Selection                                |

| ![Episode](./imagesgit/3.png)        | ![]()                 |
|:------------------------------------------:|:----------------------------------------------------:|
| Episode Preview                                    |                                            |