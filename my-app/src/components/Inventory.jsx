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
import InventoryHeader from "./InventoryHeader";
import AddInventory from "./AddInventory";
import InventoryTable from "./InventoryTable";
function Inventory() {
  return (
    <>
    <InventoryHeader />
    <AddInventory />
    <InventoryTable />

    
    </>

    

  );
}

export default Inventory;
