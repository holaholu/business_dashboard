import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff9d', // Neon green
      light: '#6effbe',
      dark: '#00cc7d',
    },
    secondary: {
      main: '#7b36ff', // Electric purple
      light: '#9d6fff',
      dark: '#5900ff',
    },
    background: {
      default: '#0a0e17', // Dark navy
      paper: '#151c28',
    },
    text: {
      primary: '#ffffff',
      secondary: '#94a3b8',
    },
    error: {
      main: '#ff3358', // Neon red
    },
    success: {
      main: '#00ff9d', // Neon green
    },
    warning: {
      main: '#ffb300', // Bright amber
    },
    info: {
      main: '#00d4ff', // Cyan
    },
  },
  typography: {
    fontFamily: '"JetBrains Mono", "Roboto Mono", monospace',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
      background: 'linear-gradient(45deg, #00ff9d 30%, #00d4ff 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      letterSpacing: '0.05em',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 4,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          background: 'linear-gradient(135deg, rgba(21, 28, 40, 0.9) 0%, rgba(10, 14, 23, 0.9) 100%)',
          '&:hover': {
            border: '1px solid rgba(0, 255, 157, 0.3)',
            boxShadow: '0 0 20px rgba(0, 255, 157, 0.1)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '8px 24px',
          background: 'linear-gradient(45deg, #00ff9d 30%, #00d4ff 90%)',
          border: 0,
          color: '#0a0e17',
          height: 40,
          boxShadow: '0 3px 15px rgba(0, 255, 157, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(0, 255, 157, 0.5)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(21, 28, 40, 0.9)',
          border: '1px solid rgba(0, 255, 157, 0.3)',
          '&:hover': {
            backgroundColor: 'rgba(0, 255, 157, 0.1)',
            border: '1px solid rgba(0, 255, 157, 0.5)',
          },
        },
        label: {
          color: '#ffffff',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#94a3b8',
          '&:hover': {
            color: '#00ff9d',
            backgroundColor: 'rgba(0, 255, 157, 0.1)',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#00ff9d #151c28',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: '#151c28',
            width: 8,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 4,
            backgroundColor: '#00ff9d',
            border: '2px solid #151c28',
          },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#6effbe',
          },
        },
      },
    },
  },
});

export default theme;
