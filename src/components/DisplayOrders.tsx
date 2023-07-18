import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import NewOrder from "./NewOrder";

type Order = {
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
};
export default function DisplayOrders() {
  const [orserStatus, setOrserStatus] = useState<
    "pending" | "success" | "cancelled"
  >("pending");
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
      <Dialog>
        <DialogTrigger asChild>
          <Button>New Order</Button>
        </DialogTrigger>
        <DialogContent>
          <NewOrder />
        </DialogContent>
      </Dialog>
      {data && (
        <Tabs defaultValue="pending">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="pending"
              onClick={() => setOrserStatus("pending")}
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              value="success"
              onClick={() => setOrserStatus("success")}
            >
              Success
            </TabsTrigger>
            <TabsTrigger
              value="cancelled"
              onClick={() => setOrserStatus("cancelled")}
            >
              Cancelled
            </TabsTrigger>
          </TabsList>
          <TabsContent value="pending">
            <Table>
              <TableCaption>All Pending Orders</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Contract</TableHead>
                  <TableHead>Direction</TableHead>
                  <TableHead>Lots</TableHead>
                  <TableHead>Trigger</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.contractSymbol}</TableCell>
                    <TableCell>{order.tradeType}</TableCell>
                    <TableCell>{order.lot}</TableCell>
                    <TableCell>{order.triggerLevel}</TableCell>
                    <TableCell>{order.candleAction}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="success">
            <Table>
              <TableCaption>All Fullfilled Orders</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Contract</TableHead>
                  <TableHead>Direction</TableHead>
                  <TableHead>Lots</TableHead>
                  <TableHead>Trigger</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.contractSymbol}</TableCell>
                    <TableCell>{order.tradeType}</TableCell>
                    <TableCell>{order.lot}</TableCell>
                    <TableCell>{order.triggerLevel}</TableCell>
                    <TableCell>{order.candleAction}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="cancelled">
            <Table>
              <TableCaption>All Cancelled Orders</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Contract</TableHead>
                  <TableHead>Direction</TableHead>
                  <TableHead>Lots</TableHead>
                  <TableHead>Trigger</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.contractSymbol}</TableCell>
                    <TableCell>{order.tradeType}</TableCell>
                    <TableCell>{order.lot}</TableCell>
                    <TableCell>{order.triggerLevel}</TableCell>
                    <TableCell>{order.candleAction}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
