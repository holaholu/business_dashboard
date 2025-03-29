import { ChartConfig } from '../types/chart';

const formatNumber = (num: number): number => {
  return Number(num.toFixed(1));
};

const generateRandomData = (count: number) => Array.from({ length: count }, (_, i) => ({
  id: `item-${i + 1}`,
  label: `Item ${i + 1}`,
  value: formatNumber(Math.random() * 1000 + 100),
  x: formatNumber(Math.random() * 100),
  y: formatNumber(Math.random() * 100)
}));

export const sampleChartConfigs: ChartConfig[] = [
  {
    id: 'sales-trend',
    type: 'line',
    title: 'Monthly Sales Trend',
    description: 'Sales performance over the last 12 months',
    data: Array.from({ length: 12 }, (_, i) => ({
      id: `month-${i + 1}`,
      label: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
      value: Math.floor(Math.random() * 1000) + 500
    })),
    xAxis: { label: 'Month', key: 'label' },
    yAxis: { label: 'Sales ($)', key: 'value' },
    colors: ['#2196f3'],
    gridPosition: { row: 0, col: 0 }
  },
  {
    id: 'category-distribution',
    type: 'pie',
    title: 'Sales by Category',
    description: 'Distribution of sales across product categories',
    data: [
      { id: 'electronics', label: 'Electronics', value: 35 },
      { id: 'clothing', label: 'Clothing', value: 25 },
      { id: 'books', label: 'Books', value: 20 },
      { id: 'home', label: 'Home & Garden', value: 15 },
      { id: 'other', label: 'Other', value: 5 }
    ],
    colors: ['#2196f3', '#4caf50', '#ff9800', '#f44336', '#9c27b0'],
    gridPosition: { row: 0, col: 1 }
  },
  {
    id: 'performance-metrics',
    type: 'radar',
    title: 'Performance Metrics',
    description: 'Key performance indicators across different metrics',
    data: [
      { id: 'sales', label: 'Sales', value: 85 },
      { id: 'traffic', label: 'Traffic', value: 90 },
      { id: 'conversion', label: 'Conversion', value: 70 },
      { id: 'retention', label: 'Retention', value: 75 },
      { id: 'satisfaction', label: 'Satisfaction', value: 95 }
    ],
    colors: ['#2196f3'],
    gridPosition: { row: 1, col: 0 }
  },
  {
    id: 'weekly-revenue',
    type: 'bar',
    title: 'Weekly Revenue',
    description: 'Revenue generated in the past week',
    data: Array.from({ length: 7 }, (_, i) => ({
      id: `day-${i + 1}`,
      label: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      value: Math.floor(Math.random() * 500) + 200
    })),
    xAxis: { label: 'Day', key: 'label' },
    yAxis: { label: 'Revenue ($)', key: 'value' },
    colors: ['#4caf50'],
    gridPosition: { row: 1, col: 1 }
  },
  {
    id: 'bubble-chart',
    type: 'scatter',
    title: 'Customer Segments',
    description: 'Customer segments based on spending and frequency',
    data: generateRandomData(20).map(d => ({
      ...d,
      label: `Customer ${d.id}`,
      x: d.x,
      y: d.y,
      value: Math.floor(Math.random() * 50) + 10
    })),
    xAxis: { label: 'Spending', key: 'x' },
    yAxis: { label: 'Frequency', key: 'y' },
    colors: ['#ff9800'],
    gridPosition: { row: 1, col: 2 }
  },
  {
    id: 'stream',
    type: 'stream',
    title: 'Weekly Activity Trends',
    description: 'Activity patterns across different categories over the week',
    data: [
      ...Array.from({ length: 7 }, (_, day) => [
        { id: `social-${day}`, label: 'Social', value: formatNumber(Math.random() * 50 + 30), day },
        { id: `work-${day}`, label: 'Work', value: formatNumber(Math.random() * 40 + 40), day },
        { id: `leisure-${day}`, label: 'Leisure', value: formatNumber(Math.random() * 30 + 20), day },
        { id: `exercise-${day}`, label: 'Exercise', value: formatNumber(Math.random() * 20 + 10), day }
      ]).flat(),
    ],
    xAxis: { label: 'Day', key: 'day' },
    yAxis: { label: 'Activity Level', key: 'value' },
    colors: ['#FF9800', '#2196F3', '#4CAF50', '#E91E63'],
    gridPosition: { row: 1, col: 3 }
  },
  {
    id: 'area-chart',
    type: 'area',
    title: 'Website Traffic',
    description: 'Daily website visitors over time',
    data: Array.from({ length: 30 }, (_, i) => ({
      id: `day-${i + 1}`,
      label: `${i + 1}`,
      value: Math.floor(Math.random() * 1000) + 500
    })),
    xAxis: { label: 'Day', key: 'label' },
    yAxis: { label: 'Visitors', key: 'value' },
    colors: ['#9c27b0'],
    gridPosition: { row: 2, col: 0 }
  },
  {
    id: 'donut-chart',
    type: 'donut',
    title: 'Budget Allocation',
    description: 'Current budget allocation by department',
    data: [
      { id: 'marketing', label: 'Marketing', value: 30 },
      { id: 'development', label: 'Development', value: 25 },
      { id: 'operations', label: 'Operations', value: 20 },
      { id: 'sales', label: 'Sales', value: 15 },
      { id: 'support', label: 'Support', value: 10 }
    ],
    colors: ['#e91e63', '#2196f3', '#ff9800', '#4caf50', '#9c27b0'],
    gridPosition: { row: 2, col: 1 }
  }
];
