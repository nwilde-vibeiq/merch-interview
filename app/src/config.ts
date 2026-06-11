export const config = {
  port: Number(process.env.PORT ?? 3000),
  retailPulseBaseUrl: process.env.RETAILPULSE_URL ?? 'http://localhost:4100',
};
