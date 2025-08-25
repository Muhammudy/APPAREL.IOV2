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

function InventoryHeader() {
  return (
    <Card className="flex flex-col w-full shadow-md">
      {/* Card Header */}
      <CardHeader className="flex justify-between items-center  pb-2 px-4">
        {/* Filter Buttons */}
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <CardTitle className="text-sm">All</CardTitle>
          </Button>
          <Button variant="outline" size="sm">
            <CardTitle className="text-sm">Sold</CardTitle>
          </Button>
          <Button variant="outline" size="sm">
            <CardTitle className="text-sm">Listed</CardTitle>
          </Button>
        </div>

        {/* Search Input */}
        <CardAction>
          <div className="flex items-center space-x-2">
            <Label htmlFor="search" className="sr-only">
              Search
            </Label>
            <Input
              type="search"
              id="search"
              placeholder="Search inventory..."
              className="w-64"
            />
          </div>
        </CardAction>
      </CardHeader>


    </Card>
  );
}

export default InventoryHeader;
