import { Transaction } from "@prisma/client";
import { Crypto } from "@prisma/client";

export const fakeTransactions: Transaction[] = [
  {
    id: 1,
    date: new Date("2024-11-20T10:15:30Z"),
    email: "randomemail@example.com",
    send: 1400.0,
    sendCurrency: "USD",
    receive: 0.05,
    receiveCurrency: "BTC",
    phone: "+54 11 2345 6789",
  },
  {
    id: 2,
    date: new Date("2024-11-18T15:45:00Z"),
    email: "user2@example.com",
    send: 1.5,
    sendCurrency: "ETH",
    receive: 2700.0,
    receiveCurrency: "USD",
    phone: "+54 9 351 567 8910",
  },
  {
    id: 3,
    date: new Date("2024-11-15T12:00:00Z"),
    email: "user3@example.com",
    send: 0.2,
    sendCurrency: "BTC",
    receive: 5600.0,
    receiveCurrency: "USD",
    phone: "+54 11 9876 5432",
  },
  {
    id: 4,
    date: new Date("2024-11-14T08:30:45Z"),
    email: "user4@example.com",
    send: 1400.0,
    sendCurrency: "USD",
    receive: 0.8,
    receiveCurrency: "ETH",
    phone: "+54 221 123 4567",
  },
  {
    id: 5,
    date: new Date("2024-11-10T19:20:10Z"),
    email: "user5@example.com",
    send: 8400.0,
    sendCurrency: "USD",
    receive: 0.3,
    receiveCurrency: "BTC",
    phone: "+54 11 4567 8901",
  },
  {
    id: 6,
    date: new Date("2024-11-09T14:05:30Z"),
    email: "user6@example.com",
    send: 2.0,
    sendCurrency: "ETH",
    receive: 3600.0,
    receiveCurrency: "USD",
    phone: "+54 261 234 5678",
  },
];

export const fakeCryptos: Crypto[] = [
  {
    id: 1,
    name: "Bitcoin",
    crypto: "BTC",
    commission: 2, // in percentage
    fee: 5, // in USD
  },
  {
    id: 2,
    name: "Ethereum",
    crypto: "ETH",
    commission: 3, // in percentage
    fee: 4, // in USD
  },
  {
    id: 3,
    name: "Litecoin",
    crypto: "LTC",
    commission: 1, // in percentage
    fee: 2, // in USD
  },
  {
    id: 4,
    name: "Ripple",
    crypto: "XRP",
    commission: 2, // in percentage
    fee: 3, // in USD
  },
  {
    id: 5,
    name: "Dogecoin",
    crypto: "DOGE",
    commission: 4, // in percentage
    fee: 1, // in USD
  },
  {
    id: 6,
    name: "Cardano",
    crypto: "ADA",
    commission: 3, // in percentage
    fee: 3, // in USD
  },
];
