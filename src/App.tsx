import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Footer from './components/Footer';
import EditIcon from '@mui/icons-material/Edit';
import { Fragment, useState, useRef, useEffect } from 'react';
import Chart from './components/Chart';
import { sampleChartConfigs } from './data/sampleData';
import { ChartConfig } from './types/chart';

function App() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [expandedDimensions, setExpandedDimensions] = useState({
    width: 0,
    height: 0
  });
  const [selectedChart, setSelectedChart] = useState<ChartConfig | null>(null);
  const [editedData, setEditedData] = useState<any[]>([]);

  useEffect(() => {
    const updateDimensions = () => {
      if (chartContainerRef.current) {
        const { width, height } = chartContainerRef.current.getBoundingClientRect();
        setExpandedDimensions({
          width: Math.floor(width),
          height: Math.floor(height)
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleChartClick = (chart: ChartConfig) => {
    setSelectedChart(chart);
    setEditedData([...chart.data]);
  };

  const handleClose = () => {
    setSelectedChart(null);
    setEditedData([]);
  };

  const handleDataChange = (index: number, field: string, value: string) => {
    // For numeric fields, format to 1 decimal place
    const formattedValue = field === 'value' || field === 'x' || field === 'y'
      ? Number(Number(value).toFixed(1))
      : value;
    const newData = [...editedData];
    newData[index] = {
      ...newData[index],
      [field]: formattedValue
    };
    setEditedData(newData);
  };

  const handleSave = () => {
    if (selectedChart) {
      const updatedConfigs = sampleChartConfigs.map(config =>
        config.id === selectedChart.id ? { ...config, data: editedData } : config
      );
      // In a real app, you would update the state/backend here
      console.log('Updated data:', editedData);
    }
    handleClose();
  };
  const dimensions = {
    width: 280,
    height: 220,
    margin: { top: 20, right: 20, bottom: 30, left: 40 }
  };

  return (
    <Fragment>
      <Container 
      maxWidth="xl" 
      sx={{ 
        py: { xs: 2, sm: 3, md: 4 }, 
        px: { xs: 1, sm: 2, md: 3 },
        overflowX: 'hidden',
        boxSizing: 'border-box',
        mx: 'auto'
      }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        align="center" 
        sx={{ 
          mb: { xs: 3, sm: 4, md: 5 },
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          textShadow: '0 0 20px rgba(0, 255, 157, 0.3)',
          position: 'relative',

        }}>
        Business Data Dashboard
      </Typography>
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { 
          xs: '1fr',                    // 1 column for mobile
          sm: 'repeat(2, 1fr)',        // 2 columns for small tablets
          md: 'repeat(3, 1fr)',        // 3 columns for large tablets
          lg: 'repeat(4, 1fr)'         // 4 columns for desktop
        }, 
        gap: { xs: 2, sm: 2, md: 2.5, lg: 3 },
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        mx: 'auto'
      }}>
        {sampleChartConfigs.map((config) => (
          <Box key={config.id} onClick={() => handleChartClick(config)} sx={{ cursor: 'pointer', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)' } }}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: { xs: 1.5, sm: 2 },
                boxSizing: 'border-box',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                minHeight: { xs: 280, sm: 300, md: 320 },
                maxHeight: { xs: 320, sm: 340, md: 360 }
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" display="block" sx={{ color: 'text.secondary', mb: 1 }}>
                  Click graph to view and edit data
                </Typography>
                <Typography variant="h6">
                  {config.title}
                </Typography>
              </Box>
              {/* Description only shown in expanded view */}
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Chart
                  data={config.data}
                  config={config}
                  dimensions={dimensions}
                  isExpanded={false}
                />
              </Box>
            </Paper>
          </Box>
        ))}
      </Box>
    </Container>
    <Footer />

    <Dialog
      open={!!selectedChart}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: '90vh',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      {selectedChart && (
        <>
          <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedChart.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedChart.description}
              </Typography>
            </Box>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{ color: 'grey.500' }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Box 
              ref={chartContainerRef} 
              sx={{ 
                height: { xs: 300, sm: 400, md: 500 }, 
                width: '100%',
                mb: 3,
                '& > div': {
                  height: '100%',
                  width: '100%'
                }
              }}>
              <Chart
                data={editedData}
                config={selectedChart}
                dimensions={{
                  width: expandedDimensions.width || 800,
                  height: expandedDimensions.height || 500,
                  margin: { top: 30, right: 30, bottom: 50, left: 50 }
                }}
                isExpanded={true}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ 
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                opacity: 0.9,
                fontFamily: 'JetBrains Mono'
              }}>
                <EditIcon fontSize="small" /> Values can be edited below
              </Typography>
            </Box>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Label</TableCell>
                    <TableCell align="right">Value</TableCell>
                    {(selectedChart.type === 'scatter' || selectedChart.type === 'heatmap') && (
                      <>
                        <TableCell align="right">X</TableCell>
                        <TableCell align="right">Y</TableCell>
                      </>
                    )}
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {editedData.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <TextField
                          size="small"
                          value={item.label}
                          onChange={(e) => handleDataChange(index, 'label', e.target.value)}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          size="small"
                          type="number"
                          value={item.value}
                          onChange={(e) => handleDataChange(index, 'value', e.target.value)}
                          inputProps={{
                            step: 0.1
                          }}
                        />
                      </TableCell>
                      {(selectedChart.type === 'scatter' || selectedChart.type === 'heatmap') && (
                        <>
                          <TableCell align="right">
                            <TextField
                              size="small"
                              type="number"
                              value={item.x}
                              onChange={(e) => handleDataChange(index, 'x', e.target.value)}
                              inputProps={{
                                step: 0.1
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <TextField
                              size="small"
                              type="number"
                              value={item.y}
                              onChange={(e) => handleDataChange(index, 'y', e.target.value)}
                              inputProps={{
                                step: 0.1
                              }}
                            />
                          </TableCell>
                        </>
                      )}
                      <TableCell align="right">
                        <IconButton size="small" color="primary">
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
    </Fragment>
  );
}

export default App;
