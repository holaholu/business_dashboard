# Business Data Dashboard

An interactive data visualization dashboard built with React and D3.js, showcasing various business metrics and analytics.

## Features

- **Performance Metrics**: Radar chart displaying key performance indicators
- **Weekly Activity Trends**: Line chart showing activity patterns throughout the week
- **Monthly Sales Trend**: Bar chart visualizing sales data over months
- **Website Traffic**: Area chart representing visitor traffic patterns
- **Weekly Revenue**: Stacked bar chart comparing revenue streams

## Technologies Used

- **React**: Frontend framework for building the user interface
- **TypeScript**: Type-safe development
- **D3.js**: Data visualization library for creating interactive charts
- **Material-UI**: Modern UI components and styling
- **Custom Hooks**: React hooks for D3.js integration

## Live Demo

Visit the live dashboard at: [https://leafy-chaja-26f1d6.netlify.app/](https://leafy-chaja-26f1d6.netlify.app/)

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Project Structure

```
src/
├── components/     # React components for charts and layout
├── hooks/         # Custom hooks for D3.js integration
├── data/          # Sample data and data utilities
├── types/         # TypeScript type definitions
└── utils/         # Helper functions and utilities
```

## Implementation Details

- **Responsive Design**: Charts automatically resize based on viewport
- **Interactive Elements**: Hover effects and tooltips for data points
- **Grid/Expanded Views**: Toggle between compact and detailed views
- **Real-time Updates**: Data refreshes to simulate live updates
- **Theme Integration**: Consistent styling with Material-UI theme

## Future Enhancements

- Add more chart types and visualization options
- Implement data filtering and sorting
- Add export functionality for charts
- Include more interactive features and animations
- Add unit tests and integration tests
