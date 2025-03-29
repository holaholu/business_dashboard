import React from 'react';
import useD3 from '../hooks/useD3';
import { ChartConfig, ChartDimensions, DataPoint } from '../types/chart';
import * as d3 from 'd3';
import Box from '@mui/material/Box';

interface ChartProps {
  data: DataPoint[];
  config: ChartConfig;
  dimensions: ChartDimensions;
  isExpanded?: boolean;
}

const Chart: React.FC<ChartProps> = ({ data, config, dimensions: initialDimensions, isExpanded = false }) => {
  const [dimensions, setDimensions] = React.useState(initialDimensions);

  React.useEffect(() => {
    setDimensions(initialDimensions);
  }, [initialDimensions]);
  const ref = useD3(
    (svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) => {
      const { width, height, margin } = dimensions;
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      // Clear any existing content
      svg.selectAll('*').remove();

      // Create the container with margins
      const container = svg
        .append('g')
        .attr('transform', `translate(${isExpanded ? margin.left : margin.left / 2},${margin.top})`);

      // Create scales based on chart type
      const xScale: d3.ScaleLinear<number, number> | d3.ScaleBand<string> = config.type === 'scatter' 
        ? d3.scaleLinear()
            .domain([0, d3.max(data, d => d.x || 0) || 0])
            .range([0, innerWidth])
        : d3.scaleBand()
            .domain(data.map(d => d.label))
            .range([0, innerWidth])
            .padding(0.1);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value) || 0])
        .range([innerHeight, 0])
        .nice();

      // Add X axis with fewer ticks in grid view
      const xAxis = container
        .append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(
          (config.type === 'scatter' 
            ? d3.axisBottom(xScale as d3.ScaleLinear<number, number>)
            : d3.axisBottom(xScale as d3.ScaleBand<string>)
          ).ticks(isExpanded ? undefined : 5)
        )
        .call(g => {
          if (config.title === 'Weekly Activity Trends') {
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            g.selectAll('.tick text')
              .style('font-size', isExpanded ? '1em' : '0.9em')
              .style('fill', '#94a3b8')
              .text((d: any) => days[Math.floor(d)] || '');
          } else {
            g.selectAll('.tick text')
              .style('font-size', isExpanded ? '1em' : '0.8em');
          }
        });

      if (config.xAxis?.label) {
        xAxis.append('text')
          .attr('fill', '#94a3b8')
          .attr('x', innerWidth / 2)
          .attr('y', margin.bottom - 5)
          .attr('text-anchor', 'middle')
          .text(config.xAxis.label);
      }

      // Add Y axis with fewer ticks in grid view
      const yAxis = container
        .append('g')
        .call(
          d3.axisLeft(yScale)
            .ticks(isExpanded ? undefined : 5)
        )
        .call(g => {
          g.selectAll('.tick text')
            .style('font-size', isExpanded ? '0.9em' : '0.8em')
            .style('fill', '#94a3b8');
          g.selectAll('.tick line')
            .style('stroke', '#334155');
          g.select('.domain')
            .style('stroke', '#334155');
        });

      // Add Y axis label only in expanded view
      if (isExpanded && config.yAxis?.label) {
        yAxis.append('text')
          .attr('fill', '#94a3b8')
          .attr('transform', 'rotate(-90)')
          .attr('y', -margin.left + 15)
          .attr('x', -innerHeight / 2)
          .attr('text-anchor', 'middle')
          .text(config.yAxis.label);
      }

      // Draw chart based on type
      switch (config.type) {
        case 'bar':
          container.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', d => (xScale as d3.ScaleBand<string>)(d.label) || 0)
            .attr('y', d => yScale(d.value))
            .attr('width', (xScale as d3.ScaleBand<string>).bandwidth())
            .attr('height', d => innerHeight - yScale(d.value))
            .attr('fill', config.colors?.[0] || '#00ff9d')
            .style('filter', 'drop-shadow(0px 2px 4px rgba(0,0,0,0.15))');

          // Add value labels for bar charts
          if (config.title === 'Performance Metrics') {
            container.selectAll('.value-label')
              .data(data)
              .join('text')
              .attr('class', 'value-label')
              .attr('x', d => ((xScale as d3.ScaleBand<string>)(d.label) || 0) + (xScale as d3.ScaleBand<string>).bandwidth() / 2)
              .attr('y', d => yScale(d.value) - 8)
              .attr('text-anchor', 'middle')
              .text(d => d.value.toFixed(1))
              .style('fill', '#ffffff')
              .style('font-size', '0.9em')
              .style('font-weight', '600')
              .style('paint-order', 'stroke')
              .style('stroke', '#000000')
              .style('stroke-width', '3px')
              .style('stroke-linecap', 'round')
              .style('stroke-linejoin', 'round')
              .style('text-shadow', '0 2px 4px rgba(0, 0, 0, 0.8)');
          }
          break;

        case 'line':
        case 'area':
          const line = d3.line<DataPoint>()
            .x(d => ((xScale as d3.ScaleBand<string>)(d.label) || 0) + ((xScale as d3.ScaleBand<string>).bandwidth() / 2))
            .y(d => yScale(d.value))
            .curve(d3.curveMonotoneX);

          if (config.type === 'area') {
            const area = d3.area<DataPoint>()
              .x(d => ((xScale as d3.ScaleBand<string>)(d.label) || 0) + ((xScale as d3.ScaleBand<string>).bandwidth() / 2))
              .y0(innerHeight)
              .y1(d => yScale(d.value))
              .curve(d3.curveMonotoneX);

            container.append('path')
              .datum(data)
              .attr('fill', config.colors?.[0] || '#00ff9d')
              .attr('fill-opacity', 0.2)
              .attr('d', area);
          }

          container.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', config.colors?.[0] || '#00ff9d')
            .attr('stroke-width', 2)
            .attr('d', line)
            .style('filter', 'drop-shadow(0px 1px 3px rgba(0,0,0,0.2))');

          // Add circles at data points and value labels for line/area charts
          if (config.title === 'Weekly Activity Trends') {
            // Add circles at data points
            container.selectAll('.data-point')
              .data(data)
              .join('circle')
              .attr('class', 'data-point')
              .attr('cx', d => ((xScale as d3.ScaleBand<string>)(d.label) || 0) + (xScale as d3.ScaleBand<string>).bandwidth() / 2)
              .attr('cy', d => yScale(d.value))
              .attr('r', 4)
              .attr('fill', '#ffffff')
              .attr('stroke', config.colors?.[0] || '#00ff9d')
              .attr('stroke-width', 2);

            // Add value labels
            container.selectAll('.value-label')
              .data(data)
              .join('text')
              .attr('class', 'value-label')
              .attr('x', d => ((xScale as d3.ScaleBand<string>)(d.label) || 0) + (xScale as d3.ScaleBand<string>).bandwidth() / 2)
              .attr('y', d => yScale(d.value) - 8)
              .attr('text-anchor', 'middle')
              .text(d => d.value.toFixed(1))
              .style('fill', '#ffffff')
              .style('font-size', '0.9em')
              .style('font-weight', '600')
              .style('paint-order', 'stroke')
              .style('stroke', '#000000')
              .style('stroke-width', '3px')
              .style('stroke-linecap', 'round')
              .style('stroke-linejoin', 'round')
              .style('text-shadow', '0 2px 4px rgba(0, 0, 0, 0.8)');
          }
          break;

        case 'scatter':
          container.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', d => (xScale as d3.ScaleLinear<number, number>)(d.x || 0))
            .attr('cy', d => yScale(d.value))
            .attr('r', 5)
            .attr('fill', config.colors?.[0] || '#00ff9d')
            .attr('opacity', 0.7)
            .style('filter', 'drop-shadow(0px 2px 4px rgba(0,0,0,0.15))');
          break;

        case 'pie':
        case 'donut': {
          const radius = Math.min(innerWidth, innerHeight) / 2;
          const arc = d3.arc<d3.PieArcDatum<DataPoint>>()
            .innerRadius(config.type === 'donut' ? radius * 0.6 : 0)
            .outerRadius(radius);

          const pie = d3.pie<DataPoint>()
            .value(d => d.value)
            .sort(null);

          const pieContainer = container
            .append('g')
            .attr('transform', `translate(${innerWidth / 2},${innerHeight / 2})`);

          const arcs = pieContainer
            .selectAll('path')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (_, i) => config.colors?.[i] || d3.schemeCategory10[i])
            .style('filter', 'drop-shadow(0px 2px 4px rgba(0,0,0,0.15))');

          if (isExpanded) {
            const labelArc = d3.arc<d3.PieArcDatum<DataPoint>>()
              .innerRadius(radius * 0.8)
              .outerRadius(radius * 0.8);

            pieContainer
              .selectAll('text')
              .data(pie(data))
              .enter()
              .append('text')
              .attr('transform', d => `translate(${labelArc.centroid(d)})`)
              .attr('dy', '0.35em')
              .attr('text-anchor', 'middle')
              .text(d => d.data.label)
              .style('fill', '#ffffff')
              .style('font-size', '0.9em')
              .style('font-weight', '600')
              .style('paint-order', 'stroke')
              .style('stroke', 'rgba(0, 0, 0, 0.8)')
              .style('stroke-width', '2px')
              .style('stroke-linecap', 'round')
              .style('stroke-linejoin', 'round')
              .style('text-shadow', '0 1px 4px rgba(0, 0, 0, 0.5)');
          }
          break;
        }

        case 'stream': {
          // Group data by day and category
          const categories = Array.from(new Set(data.map(d => d.label)));
          const days = Array.from(new Set(data.map(d => d.day)));

          // Create stacked data
          const stackedData = d3.stack()
            .keys(categories)
            .offset(d3.stackOffsetWiggle)
            .value((d: any, key) => d[key])(days.map(day => {
              const dayData = data.filter(d => d.day === day);
              return categories.reduce((acc, cat) => {
                acc[cat] = dayData.find(d => d.label === cat)?.value || 0;
                return acc;
              }, { day } as any);
            }));

          // Create scales
          const xScale = d3.scaleLinear()
            .domain([0, days.length - 1])
            .range([0, innerWidth]);

          const yScale = d3.scaleLinear()
            .domain([d3.min(stackedData.flat(2)) || 0, d3.max(stackedData.flat(2)) || 0])
            .range([innerHeight, 0]);

          // Create area generator
          const area = d3.area<any>()
            .x((_, i) => xScale(i))
            .y0(d => yScale(d[0]))
            .y1(d => yScale(d[1]))
            .curve(d3.curveBasis);

          // Draw streams
          stackedData.forEach((layer, i) => {
            container.append('path')
              .datum(layer)
              .attr('d', area as any)
              .attr('fill', config.colors?.[i] || '#ccc')
              .attr('opacity', 0.8);
          });

          // Add x-axis
          const xAxis = d3.axisBottom(xScale)
            .ticks(days.length)
            .tickFormat(d => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][Math.floor(Number(d))]);

          container.append('g')
            .attr('transform', `translate(0,${innerHeight})`)
            .call(xAxis);

          // Add y-axis
          const yAxis = d3.axisLeft(yScale)
            .ticks(5);

          container.append('g')
            .call(yAxis);

          // Add legend
          const legend = container.append('g')
            .attr('transform', `translate(${innerWidth + 10}, 0)`);

          categories.forEach((category, i) => {
            const legendItem = legend.append('g')
              .attr('transform', `translate(0, ${i * 20})`);

            legendItem.append('rect')
              .attr('width', 10)
              .attr('height', 10)
              .attr('fill', config.colors?.[i] || '#ccc');

            legendItem.append('text')
              .attr('x', 15)
              .attr('y', 9)
              .text(category)
              .style('fill', '#ffffff')
              .style('font-size', '0.9em')
              .style('font-weight', '600')
              .style('paint-order', 'stroke')
              .style('stroke', '#000000')
              .style('stroke-width', '2px')
              .style('stroke-linecap', 'round')
              .style('stroke-linejoin', 'round')
              .style('text-shadow', '0 1px 3px rgba(0, 0, 0, 0.8)');
          });

          break;
        }

        case 'heatmap': {
          const colorScale = d3.scaleSequential()
            .domain([0, d3.max(data, d => d.value) || 0])
            .interpolator(d3.interpolateYlOrRd);

          const uniqueX = Array.from(new Set(data.map(d => d.x ?? 0)));
          const uniqueY = Array.from(new Set(data.map(d => d.y ?? 0)));
          const cellWidth = innerWidth / uniqueX.length;
          const cellHeight = innerHeight / uniqueY.length;

          // Create scales for heatmap
          if (config.type === 'heatmap') {
            const maxX = Math.max(...uniqueX.map(x => Number(x) || 0));
            const maxY = Math.max(...uniqueY.map(y => Number(y) || 0));

            const heatmapXScale = d3.scaleLinear()
              .domain([0, maxX])
              .range([0, innerWidth]);

            const heatmapYScale = d3.scaleLinear()
              .domain([0, maxY])
              .range([0, innerHeight]);

            // Create x-axis with fewer ticks
            const xAxis = d3.axisBottom(heatmapXScale)
              .ticks(4)
              .tickFormat(d => `${Math.floor(Number(d))}:00`);

            container.append('g')
              .attr('transform', `translate(0,${innerHeight})`)
              .call(xAxis)
              .selectAll('text')
              .style('text-anchor', 'middle');

            // Create y-axis
            const yAxis = d3.axisLeft(heatmapYScale)
              .ticks(7)
              .tickFormat(d => `Day ${Math.floor(Number(d)) + 1}`);

            container.append('g')
              .call(yAxis);
          }

          container.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', d => (d.x || 0) * cellWidth)
            .attr('y', d => (d.y || 0) * cellHeight)
            .attr('width', cellWidth)
            .attr('height', cellHeight)
            .attr('fill', d => colorScale(d.value));
          break;
        }

        case 'radar': {
          const angleSlice = (Math.PI * 2) / data.length;
          const radius = Math.min(innerWidth, innerHeight) / 2;
          const radarContainer = container
            .append('g')
            .attr('transform', `translate(${innerWidth / 2},${innerHeight / 2})`);

          // Create circular grid
          const levels = 5;
          for (let j = 0; j < levels; j++) {
            const levelFactor = radius * ((j + 1) / levels);
            radarContainer.selectAll('.grid-circle-' + j)
              .data([1])
              .enter()
              .append('circle')
              .attr('r', levelFactor)
              .attr('fill', 'none')
              .attr('stroke', '#ccc')
              .attr('stroke-opacity', 0.3);
          }

          // Create axes
          data.forEach((_, i) => {
            const angle = i * angleSlice;
            radarContainer.append('line')
              .attr('x1', 0)
              .attr('y1', 0)
              .attr('x2', radius * Math.cos(angle - Math.PI / 2))
              .attr('y2', radius * Math.sin(angle - Math.PI / 2))
              .attr('stroke', '#ccc')
              .attr('stroke-opacity', 0.3);
          });

          // Create the radar chart path
          const radarLine = d3.lineRadial<DataPoint>()
            .radius(d => (d.value / (d3.max(data, d => d.value) || 1)) * radius)
            .angle((_, i) => i * angleSlice);

          radarContainer.append('path')
            .datum(data)
            .attr('d', radarLine as any)
            .attr('fill', config.colors?.[0] || '#00ff9d')
            .attr('fill-opacity', 0.2)
            .attr('stroke', config.colors?.[0] || '#00ff9d')
            .attr('stroke-width', 2);

          // Add labels and values
          if (isExpanded) {
            data.forEach((d, i) => {
              const angle = i * angleSlice;
              // Add category labels (further out)
              const labelRadius = radius * 1.15;
              radarContainer.append('text')
                .attr('x', labelRadius * Math.cos(angle - Math.PI / 2))
                .attr('y', labelRadius * Math.sin(angle - Math.PI / 2))
                .attr('text-anchor', 'middle')
                .attr('dy', '0.35em')
                .text(d.label)
                .style('fill', '#ffffff')
                .style('font-size', '0.9em')
                .style('font-weight', '600')
                .style('paint-order', 'stroke')
                .style('stroke', '#000000')
                .style('stroke-width', '3px')
                .style('stroke-linecap', 'round')
                .style('stroke-linejoin', 'round')
                .style('text-shadow', '0 2px 4px rgba(0, 0, 0, 0.8)');

              // Add value labels (on the data points)
              const valueRadius = (d.value / (d3.max(data, d => d.value) || 1)) * radius;
              radarContainer.append('text')
                .attr('x', valueRadius * Math.cos(angle - Math.PI / 2))
                .attr('y', valueRadius * Math.sin(angle - Math.PI / 2))
                .attr('text-anchor', 'middle')
                .attr('dy', '0.35em')
                .text(d.value.toFixed(1))
                .style('fill', '#ffffff')
                .style('font-size', '0.9em')
                .style('font-weight', '600')
                .style('paint-order', 'stroke')
                .style('stroke', '#000000')
                .style('stroke-width', '3px')
                .style('stroke-linecap', 'round')
                .style('stroke-linejoin', 'round')
                .style('text-shadow', '0 2px 4px rgba(0, 0, 0, 0.8)');
            });
          }
          break;
        }
      }
    },
    [data, config, dimensions, isExpanded]
  );

  return (
    <Box 
      sx={{ 
        width: '100%', 
        height: '100%',
        '& svg': {
          width: '100%',
          height: '100%',
          display: 'block',
        }
      }}
    >
      <svg
        ref={ref}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <g className="plot-area" />
      </svg>
    </Box>
  );
};

export default Chart;
