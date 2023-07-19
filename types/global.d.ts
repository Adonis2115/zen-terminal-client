interface Order {
  id: number;
  indexSymbol: string;
  triggerLevel: number;
  candleAction: string;
  optionType: string;
  tradeType: string;
  strikePrie: number;
  expiryDate: Date;
  contractSymbol: string;
  lot: number;
  contractSecurity: string;
  status: string;
}

type OrderStatus = "pending" | "success" | "cancelled";
