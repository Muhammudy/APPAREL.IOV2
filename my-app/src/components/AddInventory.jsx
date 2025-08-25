import React, { useState, useEffect } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,

  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Plus , Download, Upload, Filter, RefreshCcw } from "lucide-react";

function AddInventory() {
  return (
    <Card className="mt-4 flex flex-col w-full shadow-md">
      {/* Card Header */}
      <CardHeader className="flex justify-between items-center pb-2 px-4">
        <CardContent className = "flex space-x-2 text-base font-semibold">
            Add an Item 
        </CardContent>
        <div className="flex space-x-2">
        <Button variant="outline" size="sm">
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


    </Card>
  );
}

export default AddInventory;
