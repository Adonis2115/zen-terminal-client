import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import NewOrder from "./NewOrder";

export default function Orders() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New Order</Button>
      </DialogTrigger>
      <DialogContent>
        <NewOrder />
      </DialogContent>
    </Dialog>
  );
}
