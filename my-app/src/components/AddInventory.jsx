import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "./ui/card";
import { Button } from "./ui/button";
import { Plus , Upload, Filter, RefreshCcw } from "lucide-react";
import AddProduct from "./AddProduct";

function AddInventory() {
  const [open, setOpen] = useState(false);

  return (
    <Card className="mt-4 flex flex-col w-full shadow-md">
      <CardHeader className="flex justify-between items-center pb-2 px-4">
        <CardContent className="flex space-x-2 text-base font-semibold">
          Add an Item 
        </CardContent>

        <div className="flex space-x-2">
          {/* This button controls the AddProduct dialog */}
          <Button onClick={() => setOpen(true)} variant="outline" size="sm">
            <Plus />
          </Button>
          <Button variant="outline" size="sm">
            <Upload />
          </Button>
          <Button variant="outline" size="sm">
            <Filter />
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCcw />
          </Button>
        </div>
      </CardHeader>

      {/* Render the dialog, controlled by state */}
      <AddProduct open={open} setOpen={setOpen} />
    </Card>
  );
}

export default AddInventory;
