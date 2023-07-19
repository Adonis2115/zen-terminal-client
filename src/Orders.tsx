import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import DisplayOrders from "./components/DisplayOrders";
import NewOrder from "./components/NewOrder";

export default function Orders() {
  const [orserStatus, setOrderStatus] = useState<OrderStatus>("pending");
  const { data } = useQuery({
    queryFn: () =>
      axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/trade/orders?type=${orserStatus}`
      ),
    queryKey: ["orders", `${orserStatus}`],
  });
  const orders: Order[] = data ? data.data : [];
  return (
    <div>
      <NewOrder />
      <DisplayOrders orders={orders} setOrderStatus={setOrderStatus} />
    </div>
  );
}
