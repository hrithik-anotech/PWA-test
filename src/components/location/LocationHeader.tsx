'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import AddressDrawer from './AddressDrawer';

export type Address = {
  id: string;
  type: string;
  details: string;
  flatFloor?: string;
  building?: string;
  areaText?: string;
};

const INITIAL_ADDRESSES: Address[] = [
  { id: '1', type: 'Home', details: 'Genex Exotica, Asansol WB' },
  { id: '2', type: 'Work', details: 'Tech Park, Bangalore KA' },
];

export default function LocationHeader() {
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('1');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('user_addresses');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAddresses(parsed);
        } else {
          localStorage.setItem('user_addresses', JSON.stringify(INITIAL_ADDRESSES));
        }
      } catch {
        localStorage.setItem('user_addresses', JSON.stringify(INITIAL_ADDRESSES));
      }
    } else {
      localStorage.setItem('user_addresses', JSON.stringify(INITIAL_ADDRESSES));
    }

    const storedSelected = localStorage.getItem('selected_address_id');
    if (storedSelected) {
      setSelectedAddressId(storedSelected);
    }
  }, []);

  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(id);
    localStorage.setItem('selected_address_id', id);
  };

  const refreshAddresses = () => {
    const stored = localStorage.getItem('user_addresses');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAddresses(parsed);
          
          const storedSelected = localStorage.getItem('selected_address_id');
          if (storedSelected && parsed.some(a => a.id === storedSelected)) {
            setSelectedAddressId(storedSelected);
          } else {
            setSelectedAddressId(parsed[0].id);
            localStorage.setItem('selected_address_id', parsed[0].id);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const selectedAddress =
    addresses.find((a) => a.id === selectedAddressId) || addresses[0] || INITIAL_ADDRESSES[0];

  return (
    <>
      <div
        className="mt-2 flex items-center gap-1 cursor-pointer"
        onClick={() => {
          refreshAddresses();
          setIsDrawerOpen(true);
        }}
      >
        <Image
          alt="location"
          src="/images/icons/location-white.svg"
          height={12}
          width={12}
        />
        <span className="text-base text-white truncate max-w-[200px]">
          {selectedAddress ? selectedAddress.details : 'Select Address'}
        </span>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
          <path
            d="M7 10l5 5 5-5"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <AddressDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        addresses={addresses}
        selectedAddressId={selectedAddressId}
        onSelectAddress={handleSelectAddress}
        onRefresh={refreshAddresses}
      />
    </>
  );
}

