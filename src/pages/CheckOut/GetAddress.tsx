import { useState } from "react";
import {useGetAddressesQuery} from '@/features/Address/Address'
function GetAddress() {
  const { data: addresses, isLoading } = useGetAddressesQuery();
    if (isLoading) return <div>Loading addresses...</div>;
    if (!addresses || addresses.length === 0) return <div>No addresses found.</div>;
    console.log("Fetched addresses:", addresses);
  return (
    <div></div>
  )
}

export default GetAddress