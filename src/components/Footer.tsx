import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  TextField,
  Button,
  Snackbar,
  Alert,
  Chip,
  Stack,
  Link
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Email as EmailIcon
} from '@mui/icons-material';

const techStack = [
  { name: 'React', url: 'https://react.dev/' },
  { name: 'TypeScript', url: 'https://www.typescriptlang.org/' },
  { name: 'D3.js', url: 'https://d3js.org/' },
  { name: 'Material-UI', url: 'https://mui.com/' },
  { name: 'Vite', url: 'https://vitejs.dev/' }
];

const socialLinks = [
  {
    icon: <GitHubIcon />,
    url: 'https://github.com/holaholu',
    label: 'GitHub'
  },
  {
    icon: <LinkedInIcon />,
    url: 'https://www.linkedin.com/in/olaoluadisa/',
    label: 'LinkedIn'
  },
  {
    icon: <EmailIcon />,
    url: 'mailto:olaoluhimself@yahoo.com',
    label: 'Email'
  }
];

const Footer: React.FC = () => {

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        py: 6,
        mt: 'auto',
        borderTop: 1,
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-around" alignItems="center">
          {/* Tech Stack */}
          <Grid sx={{ gridColumn: { xs: '1 / -1', md: 'span 6' } }}>
            <Typography variant="h6" gutterBottom align="center">
              Tech Stack
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1 }} justifyContent="center">
              {techStack.map((tech) => (
                <Chip
                  key={tech.name}
                  label={tech.name}
                  variant="outlined"
                  component="a"
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  clickable
                  sx={{
                    borderRadius: 1,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                      borderColor: 'primary.main'
                    }
                  }}
                />
              ))}
            </Stack>
          </Grid>

          {/* Social Links */}
          <Grid sx={{ gridColumn: { xs: '1 / -1', md: 'span 6' } }}>
            <Typography variant="h6" gutterBottom align="center">
              Connect
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              {socialLinks.map((link) => (
                <IconButton
                  key={link.label}
                  component={Link}
                  href={link.url}
                  target={link.label === 'Email' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  sx={{
                    '&:hover': {
                      color: 'primary.main'
                    }
                  }}
                >
                  {link.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 4 }}
        >
          © 2025 Ola Adisa. All rights reserved.
        </Typography>
      </Container>


    </Box>
  );
};

export default Footer;
