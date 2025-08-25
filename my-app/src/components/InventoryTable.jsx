import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import apiClient from "@/api/apiClient";

function InventoryTable() {
  return (
    <div className="mt-4 overflow-x-auto rounded-lg shadow">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-2 border-b">Item</th>
            <th className="px-4 py-2 border-b">Category</th>
            <th className="px-4 py-2 border-b">Quantity</th>
            <th className="px-4 py-2 border-b">Price</th>
            <th className="px-4 py-2 border-b">Status</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Example row, replace with mapped data later */}
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2 border-b">Laptop</td>
            <td className="px-4 py-2 border-b">Electronics</td>
            <td className="px-4 py-2 border-b">10</td>
            <td className="px-4 py-2 border-b">$999</td>
            <td className="px-4 py-2 border-b text-green-600">In Stock</td>
            <td className="px-4 py-2 border-b">
              <button className="text-blue-500 hover:underline">Edit</button>
              <button className="ml-2 text-red-500 hover:underline">Delete</button>
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2 border-b">Phone</td>
            <td className="px-4 py-2 border-b">Electronics</td>
            <td className="px-4 py-2 border-b">25</td>
            <td className="px-4 py-2 border-b">$499</td>
            <td className="px-4 py-2 border-b text-red-600">Out of Stock</td>
            <td className="px-4 py-2 border-b">
              <button className="text-blue-500 hover:underline">Edit</button>
              <button className="ml-2 text-red-500 hover:underline">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export async function inventoryLoader() {
    try{
        const response = await apiClient.get('/my-inventory-all');
        const { inventory } = response;
        return inventory

    }
    catch{
        console.error("Error fetching products");
    }
    
}

export default InventoryTable;
