import { useState, useEffect, useCallback, useRef } from 'react';

export function useHealthCheck(products, intervalMs = 60000) {
  const [healthData, setHealthData] = useState({});
  const intervalRef = useRef(null);

  const checkHealth = useCallback(async (product) => {
    const url = `https://${product.subdomain}`;
    const start = performance.now();
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);
      const response = await fetch(url, {
        mode: 'no-cors',
        signal: controller.signal,
      });
      clearTimeout(timeout);
      const responseTime = Math.round(performance.now() - start);
      return {
        status: 'online',
        responseTime,
        lastChecked: new Date().toISOString(),
      };
    } catch {
      const responseTime = Math.round(performance.now() - start);
      if (responseTime > 7500) {
        return {
          status: 'timeout',
          responseTime,
          lastChecked: new Date().toISOString(),
        };
      }
      return {
        status: 'offline',
        responseTime: null,
        lastChecked: new Date().toISOString(),
      };
    }
  }, []);

  const runAllChecks = useCallback(async () => {
    const results = {};
    const checks = products.map(async (product) => {
      const result = await checkHealth(product);
      results[product.id] = result;
    });
    await Promise.all(checks);
    setHealthData((prev) => ({ ...prev, ...results }));
  }, [products, checkHealth]);

  useEffect(() => {
    runAllChecks();
    intervalRef.current = setInterval(runAllChecks, intervalMs);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [runAllChecks, intervalMs]);

  return { healthData, refresh: runAllChecks };
}
