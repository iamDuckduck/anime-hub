<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![image](https://github.com/user-attachments/assets/559cd999-3ba9-45ef-af63-3f91095b92f7)


This web application is designed for anime enthusiasts to explore anime information and manage their own anime lists. Built with modern tools like React, Vite, and Node.js, the project integrates the Jikan API to fetch anime details and provides users with the ability to save anime to their lists, track their progress, and add favorites.

### Key Features:
* Browse and search for anime using the Jikan API
* Create, manage, and track personal anime watchlists
* Save favorite anime and track watching progress
* Secure JWT-based login for user authentication
* Responsive, modern UI built with React and Chakra UI

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

This section lists the major frameworks and libraries used in the project:

* [![React][React.js]][React-url]
* [![Chakra UI][ChakraUI-badge]][ChakraUI-url]
* [![Express][Express-badge]][Express-url]
* [![Node.js][NodeJS-badge]][NodeJS-url]
* [![MongoDB][MongoDB-badge]][MongoDB-url]
* [![Vite][Vite-badge]][Vite-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

The web example is deployed on vercel which you can access directly from here: https://anime-hub-one-chi.vercel.app/
but in case, the deployed version is broken or you want to deploy locally, here is what you can do

### Prerequisites

Before setting up the project, make sure you have the following installed:

1. **Node.js and npm** (Node Package Manager)


2. **MongoDB**
   * You need MongoDB installed and running on your local machine or a remote server. You can download it from:
     * [Download MongoDB](https://www.mongodb.com/try/download/community)
   * You can also use cloud-based solutions like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

Ensure that MongoDB is running when using the application, either locally or using a cloud service like MongoDB Atlas.

3. **Cloudinary Account**
   * You need a Cloudinary account to handle image uploads. Sign up at:
     * [Cloudinary Signup](https://cloudinary.com/)
   * After creating your account, go to your **Dashboard** to get your:
     * **Cloud name**
     * **API key**
     * **API secret**

    You will need to set these values as environment variables. To do this:

   - On **Windows**:
     ```sh
     set CLOUDINARY_NAME=your_cloud_name
     set CLOUDINARY_API_KEY=your_api_key
     set CLOUDINARY_API_SECRET=your_api_secret
     ```

   - On **macOS/Linux**:
     ```sh
     export CLOUDINARY_NAME=your_cloud_name
     export CLOUDINARY_API_KEY=your_api_key
     export CLOUDINARY_API_SECRET=your_api_secret
     ```
     
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/iamDuckduck/anime-hub.git
   ```
2. Install frontend dependencies:
   ```sh
   cd client
   npm install
   ```
3. Install backend dependencies:
   ```sh
   cd server
   npm install
   ```
4. Ensure the following environment variables are set. Use the set command for Windows or export for macOS/Linux. Make sure NODE_ENV is set to development.
   ```sh
   anime_jwtPrivateKey=yourPrivateKey
   NODE_ENV=development
   CLOUDINARY_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   MONGO_URL=your_mongo_url
   ```
5. Run the backend and frontend:
   ```sh
   # In the server folder
   nodemon

   # In the client folder
   npm run dev
   ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

This web application allows users to browse anime, manage personal anime lists, and track their favorite shows. Below are some examples of how to interact with the key features.

### 1. **Browse and Search Anime**
   * On the homepage, you can search for anime by title using the search bar.
   * The app fetches anime data from the Jikan API, allowing you to see detailed information such as synopsis, genres, and episodes.
   * Example search for **Naruto**:
     ![Search Example](https://github.com/iamDuckduck/anime-hub/images/search-example.png)

### 2. **Create a Personal Anime List**
   * After logging in, you can create a personalized watchlist by adding anime to your **Anime List**.
   * Navigate to the anime detail page, and click the **Add to List** button to include the anime in your list.
   * Your list keeps track of what you’re currently watching, plan to watch, or have completed.

### 3. **Manage Watchlists**
   * You can access your anime list under the **My List** section.
   * Here, you can update the status of anime (e.g., currently watching, completed, etc.), or remove items from the list.

### 4. **Track Watching Progress**
   * For each anime in your watchlist, you can update the episode number to track your progress.
   * When you finish an episode, simply click the **Update Progress** button.

### 5. **Mark Anime as Favorite**
   * You can mark an anime as a favorite by clicking the **Add to Favorites** button on the anime's detail page.
   * Your favorite anime will be highlighted in your **Favorites** section.

### 6. **Login and User Authentication**
   * The web app uses **JWT-based authentication** for secure login.
   * You must log in to save anime to your list, update your progress, or manage favorites.

<!-- ROADMAP -->
## Roadmap
- [ ] Improve UI layout for a better user experience
- [ ] Refactor codebase for better scalability and organization
- [ ] Refactor database structure to accommodate future features
- [ ] Handle user account deletion and information updates
- [ ] Implement periodic updates to saved anime data (to avoid outdated information from the API)
- [ ] Allow users to create custom watchlists
- [ ] Add functionality for users to search and view other users' watchlists
- [ ] Add a page to show recent user activity




<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[ChakraUI-badge]: https://img.shields.io/badge/Chakra_UI-319795?style=for-the-badge&logo=chakraui&logoColor=white
[ChakraUI-url]: https://chakra-ui.com/
[Express-badge]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express-url]: https://expressjs.com/
[NodeJS-badge]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/
[MongoDB-badge]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[Vite-badge]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E
[Vite-url]: https://vitejs.dev/


