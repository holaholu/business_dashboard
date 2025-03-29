import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const useD3 = (renderChartFn: (svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) => void, dependencies: React.DependencyList = []) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (ref.current) {
      renderChartFn(d3.select(ref.current));
    }
  }, dependencies);

  return ref;
};

export default useD3;
