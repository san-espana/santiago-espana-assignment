# Santiago España - React Native Assignment  

A React Native application built with Expo that uses Zustand for state management and React Query for data fetching and caching. The application features two screens: **Activities** and **Monthly Stats**, utilizing the Strava API. It includes OAuth for user authentication with deep linking for the Strava authorization process.  

---

## Project Overview  

This React Native application integrates with the Strava API to provide a seamless user experience with secure authentication, dynamic data fetching, and an interactive user interface.  

---

## Features  

### OAuth Authentication  
- Log in using Strava with secure token handling and refresh mechanisms.  
- Deep linking to handle OAuth redirect URIs.  

### Activities Screen  
- Displays recent activities fetched from the Strava API.  
- Shows details including:  
  - Name  
  - Date  
  - Distance  
  - Time  
  - Elevation Gain  

### Monthly Stats Screen  
- Aggregates total Distance, Time, and Elevation Gain for the past three months.  
- Includes interactive graphs to enhance user experience.  

### Navigation  
- Seamless navigation between screens using Expo Navigation.  

---

## Setup and Installation  

Follow these steps to set up and run the project:  

1. **Clone the repository:**  
   ```bash  
   git clone <repository-link>  

2. **Navigate to the project directory:**  
   ```bash  
   cd <repository-folder>

3. **Install dependencies:**  
   ```bash  
   npm install

4. **Start the Expo development server:**  
   ```bash  
   npx expo start

---

## Assumptions and Decisions  

### OAuth Deep Linking  
- Strava's OAuth did not accept the `myapp://auth/callback` deep link.  
- A custom URL (routed via my website) was implemented to retrieve the token through query parameters.  

### Monthly Stats  
- Strava's API did not provide a direct endpoint for monthly statistics.  
- Custom objects were created by aggregating activity data from each month.  

### Enhancing UX  
- Added interactive graphs in the **Monthly Stats Screen** to improve user engagement.  

---

## Areas for Improvement  

### Library Compatibility  
- Faced issues installing libraries like `victory-native` (for more interactive graphs), `react-native-toast-message`, and `lottie-react-native`. Resolving these issues would significantly enhance the app's visual appeal and user interaction.  

### Error Handling  
- Replace all `console.log` statements with proper toast notifications (e.g., toastrs) to provide better user feedback and improve the overall user experience.  

### Graph Improvements  
- Address existing errors logged during graph rendering.  
- Refine graph interactivity and visual polish to ensure a smoother experience.  

### Background and Theme  
- Encountered bugs when attempting to change the background color of the app based on the theme.  
- Fixing this issue would allow for more dynamic and visually appealing designs.  

### Placeholders  
- Pages displayed when the user is not logged in currently use placeholders.  
- These should be replaced with meaningful content or functional elements.  

### Activity Visuals  
- Add an image corresponding to the type of each activity (e.g., cycling, running) to make the **Activities Screen** more engaging and visually informative.  

### Authentication Enhancements  
- Implement additional edge-case handling in the OAuth flow to ensure robust authentication under all scenarios.  

---

## Additional Notes  

- This project demonstrates my ability to integrate advanced features like OAuth, state management, and data visualization into a React Native application.  
- Time constraints limited further exploration, but with more time, I would:  
  - Polish animations.  
  - Optimize performance.  
  - Enhance user feedback mechanisms.  

Feel free to reach out with any feedback or questions! 