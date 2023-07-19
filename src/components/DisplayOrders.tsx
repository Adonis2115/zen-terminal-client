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

export default function DisplayOrders({
  orders,
  setOrderStatus,
}: {
  orders: Order[];
  setOrderStatus: React.Dispatch<React.SetStateAction<OrderStatus>>;
}) {
  return (
    <Tabs defaultValue="pending">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="pending" onClick={() => setOrderStatus("pending")}>
          Pending
        </TabsTrigger>
        <TabsTrigger value="success" onClick={() => setOrderStatus("success")}>
          Success
        </TabsTrigger>
        <TabsTrigger
          value="cancelled"
          onClick={() => setOrderStatus("cancelled")}
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
  );
}
