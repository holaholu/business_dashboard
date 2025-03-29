export type ChartType = 
  | 'line'
  | 'bar'
  | 'pie'
  | 'scatter'
  | 'area'
  | 'donut'
  | 'heatmap'
  | 'radar'
  | 'stream';

export interface DataPoint {
  id: string;
  label: string;
  value: number;
  category?: string;
  x?: number;
  y?: number;
  day?: number;
}

export interface ChartConfig {
  id: string;
  type: ChartType;
  title: string;
  description: string;
  data: DataPoint[];
  xAxis?: {
    label: string;
    key: string;
  };
  yAxis?: {
    label: string;
    key: string;
  };
  colors?: string[];
  gridPosition: {
    row: number;
    col: number;
  };
  expanded?: boolean;
}

export interface ChartDimensions {
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}
