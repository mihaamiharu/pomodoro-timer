# Pomodoro Timer

A productivity tool built with vanilla JavaScript to help users manage their work and break sessions effectively using the Pomodoro Technique. The app features a customizable timer, task management, and a modern, user-friendly interface.

## Features

- **Pomodoro Timer**: Default 25-minute work sessions with 5-minute short breaks and 15-minute long breaks.
- **Customizable Durations**: Users can adjust the length of work, short break, and long break sessions.
- **Task Management**: Add, edit, prioritize, and delete tasks with a visual representation of task priorities.
- **Sound Notifications**: Alerts when sessions or breaks end.
- **Local Storage**: Saves settings and tasks persistently across sessions.
- **Responsive Design**: Optimized for desktop and mobile use.

## Demo

- Access the live demo: [Pomodoro Timer](http://your-vps-ip:3000)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or later)
- [Docker](https://www.docker.com/) (optional for containerized deployment)
- A modern web browser

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/mihaamiharu/pomodoro-timer.git
   cd pomodoro-timer/frontend
   ```

2. Install Dependencies
npm install

3. Open your browser and navigate to: http://localhost:3000

## Deployment
1. Build the docker image `docker build -t pomodoro-timer .`
2. Run the container `docker run -d -p 3000:3000 --name pomodoro-container pomodoro-timer`
3. Access the application at: http://localhost:3000

## Testing
Unit Test with Vitest
1. Run Unit test: `npm test`
2. Test files are located in the `frontend/tests` directory.
