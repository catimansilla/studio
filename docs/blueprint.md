# **App Name**: Rosario RemAIr

## Core Features:

- Time Input: Accepts user input for the planned time of rowing.
- Weather Data Fetching: Retrieves real-time weather data, specifically wind speed, gusts, wind direction, and temperature, using the Open-Meteo API.
- Condition Assessment: Analyzes the weather data against predefined thresholds (wind speed < 5 m/s: Optimal, 5-10 m/s: Caution, >= 10 m/s or gust > 12 m/s: Not Suitable) to determine suitability for rowing.
- Gemini Pro Explanation: Utilizes Gemini Pro to generate a user-friendly, conversational explanation of the weather conditions and the recommendation.
- Alternative Time Suggestion tool: Leverages Gemini Pro as a tool to analyze weather data and suggest alternative times that might be more suitable for rowing, when the initially selected time is not optimal.
- Windguru Integration: Embeds the Windguru Rosario spot forecast using an iframe to provide a visual overview of the weather conditions.
- Display of Results: Presents the weather data (wind speed, gusts, direction, temperature), the suitability recommendation, the Gemini Pro explanation, and the Windguru iframe in a clear, organized panel.

## Style Guidelines:

- Primary color: Forest green (#38A169), evoking nature and safety.  This is darker than the user request, to achieve proper contrast in the chosen dark color scheme.
- Background color: Dark gray-green (#2D3730), providing a subtle and sophisticated backdrop.  This color is of the same hue as the primary color, but desaturated and darkened.
- Accent color: Teal (#319795) to draw attention to calls to action, such as the 'Check Conditions' button, providing a modern touch.  This is analogous to the primary, with a different brightness and saturation.
- Body and headline font: 'Inter', a sans-serif font known for its readability and clean, modern aesthetic.
- Use weather-themed icons to visually represent data such as wind speed, direction, and temperature, improving user comprehension.
- Maintain a clean, well-spaced layout to ensure readability and ease of use, dividing content into logical sections such as time input, results panel, and Windguru iframe.
- Incorporate subtle animations and transitions when updating weather data and providing recommendations, enhancing the user experience without being distracting.