# CSPROJECT-MERN-STACK
**Link**
https://cs-project-2c7c24e37b8c.herokuapp.com/login

A web application is a comprehensive platform designed to enable gym enthusiasts to track their lifting progress, including exercises, weights lifted, and total volume over time. It integrates social features, allowing users to add friends, share their lifting achievements, and compare their progress with others. This project leverages the MERN stack (MongoDB Atlas, Express.js, React, Node.js) along with HTML, CSS, and JavaScript to create a dynamic, interactive, and user-friendly experience.

MongoDB/MongoDB Atlas: A NoSQL database that stores user data, including profiles, lift records, and social interactions (friends, posts, comments). MongoDB's flexible schema allows for the easy addition of new exercises or metrics as the application evolves.
Opted to focus with MongoDB’s platform Atlas, a cloud platform structured similar to AWS, in terms of not relying on local hosting. 

With MongoDB Atlas, this allows us to have a more reliable source of connectivity between backend, and frontend consistently, and allows us to have a local server for redundancy in case of server outages, or troubles. 

Defined schema directly with form fields to be utilized directly in tandem with node.js. 

2. Express.js: This back-end web application framework running on top of Node.js simplifies the creation of server-side logic. It handles requests such as user authentication, data retrieval, and API endpoints for interacting with the front end.

3. React: A front-end library for building the user interface. React's component-based architecture makes it ideal for this application, enabling dynamic updates to the UI as users log lifts, interact socially, or receive updates. React will be used to create a seamless, single-page application (SPA) experience, improving user engagement and performance.

4. Node.js: The JavaScript runtime environment that executes the server-side code. Node.js works in tandem with Express.js, and REST api's to manage database operations, authentication, and server logic.

HTML, CSS, and JavaScript Usage

1. HTML: Serves as the backbone of the application's structure. It defines the layout of web pages, including forms for logging lifts, user profiles, friend lists, and social feeds.

2. CSS: Used to style the application, ensuring a responsive and visually appealing design across various devices. CSS frameworks like Bootstrap 

Application Features & Workflow

- User Authentication: Secure login and registration system, including social login options, using Node.js and Express.js for handling authentication flows.

- Lift Tracking: Users can log details about their gym sessions, including exercises, sets, reps, and weights lifted. React components will enable users to input their data efficiently, and MongoDB Atlas will store this information for historical tracking and analysis.

- Progress Visualization: JavaScript, along with charting libraries (e.g., Chart.js or D3.js), will be used to generate interactive graphs and charts, allowing users to visualize their lifting progress over time.

- Social Interaction: Users can add friends, share posts about their lifting achievements, and comment on or like friends’ activities. MongoDB Atlas in tandem with REST API's will manage the social data, while React components will update the UI dynamically to reflect social interactions.

- Comparison Tools: Features enabling users to compare their progress with friends on various lifts, using filters like time range and exercise type. This will involve complex queries to MongoDB and dynamic UI updates with React.

Objectives: 
Progress Tracking: Enable users to meticulously record and monitor their lifting progress, including exercises performed, weights lifted, repetitions, sets, and overall volume. This feature should allow for easy input and visualization of progress over time.
Social Interaction: Facilitate a community aspect where users can add friends, share their lifting achievements, challenge others, and compare progress. This includes visibility settings to control who can view their achievements and progress.

Goal Setting and Notifications: Allow users to set specific lifting goals (e.g., weight, volume, personal bests) and receive notifications or reminders to stay motivated and on track.

Data Analytics and Insights: Provide analytical tools to help users understand their performance trends, identify strengths and weaknesses, and receive personalized recommendations to improve their workout efficiency.

User Engagement and Motivation: Incorporate gamification elements such as badges, leaderboards, and challenges to encourage regular use and foster a competitive yet supportive environment.

Accessibility and Usability: Ensure the platform is user-friendly, accessible on various devices (responsive design), and intuitive for people with varying levels of tech-savviness.

Security and Privacy: Implement robust security measures to protect user data, including authentication, authorization, and data encryption, while ensuring compliance with privacy laws and regulations. Is Compliant to all regulatory laws for scalability on all platforms. 

<All Completed by time of submission>

Technical Requirements:
Backend: Utilize Node.js and Express.js for the server-side logic, handling REST API requests, user authentication, and interaction with the MongoDB database for storing user data, exercises, and progress records.
Database: Use MongoDB/MongoDB Atlas, and REST API's for its flexibility with unstructured data, facilitating easy storage of varied workout logs, social interactions, and user profiles. This also allows for a more robust security since all parameters and data are going through a centralized hub instead of a computer, or host system.
Frontend: Employ React for building a dynamic and interactive UI, enhanced with HTML5, CSS3 for layout and design, and JavaScript for client-side logic. Integration of React with tools like Redux or Context API for state management.
APIs and Libraries: Integrate third-party APIs for additional functionalities such as social media integration for sharing achievements and perhaps fitness tracking devices or apps for automatic progress tracking.
Security: Implement JWT (JSON Web Tokens) for secure authentication and authorization. Use HTTPS for secure communication and consider OAuth for social media integrations.

Functionalities
User Account Management: Signup, login/logout, profile creation, and customization.
Workout Logging: Interface for entering workout details, with templates for common exercises and customization options for adding new exercises.
Progress Visualization: Graphs and charts to display progress metrics over time, with filtering options for detailed analysis.
Social Features: Friend system, sharing capabilities, privacy settings, and social feeds to see friends' progress and achievements.
Challenges and Rewards: System for setting challenges, both personal and community-wide, with rewards for completion.
Notifications and Reminders: Customizable alerts for workout reminders, goal achievements, and social interactions.
User Interface Specifications
Responsive Design: Ensure the application is fully responsive and provides an optimal experience across all devices (desktop, tablet, and mobile).
Intuitive Navigation: Easy-to-use interface with clear navigation paths, minimal clutter, and a focus on user experience.
Visual Aesthetics: Modern, clean design with customizable themes to enhance user engagement.
Accessibility: Adherence to WCAG (Web Content Accessibility Guidelines) to ensure the platform is accessible to users with disabilities.

Hardware Requirements: Computer and an internet connection. 
Backend is hosted on MongoDB Atlas for SaaS.

Development Environment:
Node.js and npm (Node Package Manager): Essential for running the server-side environment and managing the project's dependencies. Ensure you have the latest stable version of Node.js and npm installed.
MongoDB: Install MongoDB for local development and testing. For production, consider using MongoDB Atlas for cloud database service.
Text Editor or IDE: A code editor such as Visual Studio Code, Sublime Text, or an integrated development environment (IDE) like WebStorm optimized for JavaScript and React development.
Git: For version control, ensure Git is installed for tracking changes, collaborating with team members, and managing code versions.
React Developer Tools and Redux DevTools (if using Redux): Browser extensions for Chrome or Firefox that help in debugging React applications and managing application state.

Deployment
Heroku, Heroku Pipelines

Miscellaneous
Environment Variables Management Tool: Tools like dotenv for Node.js to manage environment variables for different stages of development, testing, and production securely.
Security Tools: Implement security tools and libraries such as Helmet (for Express.js), to secure HTTP headers, and bcrypt for hashing passwords.
Performance Monitoring Tools: Integration of performance monitoring tools like New Relic or LogRocket to monitor application performance and troubleshoot issues in real-time.
Analytics: Consider integrating Google Analytics for tracking user interactions and gaining insights into user behavior on the web application.
API: REST API's directly on MongoDB Atlas Platform

Kanban Board/Agile Development: 
Notion/Kanban Board: https://glass-route-998.notion.site/cc819d3fb9034ae0bfc86ce4c0ea8fac?v=e09ba55417de41a18327c666cea7f59f&pvs=4

Data and Security: 
Type validation whenever possible
Data - split across multiple classes
Users
Contains roles to allow expansion
Sensitive information is encrypted
Rate-limited access to resources
Defends against DOS attacks
Mitigates brute-force attacks
Cross Origin control
Prevents access from non-authorized sources

Slides: https://docs.google.com/presentation/d/1JvkxPrBfr4v9jTFCr0rDZJSlverRoB6B-wcZrtcNCYY/edit?usp=sharing

# Attribution
This repository was built off of and uses code from Dave Gray.
Original code is from this repository: https://github.com/gitdagray/mongo_async_crud

# Initialization

Requires the creation of the .env file:
The file includes 3 variables, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, and DATABASE_URI. The first two can be generated using node via the command: require('crypto').randomBytes(64).toString('hex')
The DATABASE_URI requires the link to the mangoDB with authentication.
 
Ex:
 
ACCESS_TOKEN_SECRET=ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
REFRESH_TOKEN_SECRET=ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
DATABASE_URI = "mongodb+srv://USERNAME:PASSWORD@MONGDB_PATH.mongodb.net/db?retryWrites=true"