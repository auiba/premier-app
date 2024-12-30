export async function getBinancePrice(from: string, to: string) {
  // Symbol is formed by combining both currencies. ie:
  // btc to usd's symbol would be BTCUSDT
  const symbol = from + to;

  const response = await fetch(
    `https://api.binance.us/api/v3/ticker/price?symbol=${symbol}`
  );
}
