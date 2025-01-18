# Memory Game

## Overview
Memory Game is a multiplayer card-matching game built with Angular for the frontend and Socket.IO for real-time communication between players. Players take turns flipping cards to find matching pairs. The player with the most matched pairs wins the game.

## Features
- Two-player modes.
- Real-time multiplayer functionality using Socket.IO.
- Responsive design for seamless gameplay across devices.
- Engaging visuals and smooth animations.

## How to Play
1. The game begins with all the cards face down.
2. Players take turns flipping two cards.
3. If the two cards match, the player keeps them and gets another turn.
4. If the cards do not match, they are flipped back face down, and the next player takes their turn.
5. The game ends when all cards are matched. The player with the most pairs wins.

## Getting Started
### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [Angular CLI](https://angular.io/cli)

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/memory-game.git
    cd memory-game
    ```

2. Install dependencies for the frontend:
    ```bash
    cd client
    npm install
    ```

3. Install dependencies for the server:
    ```bash
    cd ./server
    npm install
    ```

### Running the Game
1. Start the server:
    ```bash
    cd server
    node index.js
    ```

2. Start the Angular frontend:
    ```bash
    cd ../client
    ng serve
    ```

3. Open your browser and navigate to:
    ```
    http://localhost:4200
    ```

### Multiplayer Setup
- Ensure the server is running and accessible.
- Share your local IP address or deploy the server for remote play (ngrok for example).
- Both players can connect to the same server instance to play together.

## Technologies Used
- **Angular**: Frontend framework for building the game interface.
- **Socket.IO**: Real-time communication between players.
- **Node.js**: Backend runtime for the server.

## Contributing
Contributions are welcome! Feel free to open issues, suggest features, or submit pull requests.

## License
This project is licensed under the [MIT License](LICENSE).

---
Enjoy the game and challenge your friends!

