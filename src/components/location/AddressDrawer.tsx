'use client';

import { cn } from '@/lib/cn';
import { useEffect, useSyncExternalStore, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from '@/i18n/routing';
import { Address } from './LocationHeader';

type AddressDrawerProps = {
  open: boolean;
  onClose: () => void;
  addresses: Address[];
  selectedAddressId: string;
  onSelectAddress: (id: string) => void;
  onRefresh: () => void;
};

const subscribeToPortalTarget = () => {
  return () => {};
};

const getPortalTargetSnapshot = () => {
  return typeof document !== 'undefined';
};

const getServerPortalTargetSnapshot = () => false;

export default function AddressDrawer({
  open,
  onClose,
  addresses,
  selectedAddressId,
  onSelectAddress,
  onRefresh,
}: AddressDrawerProps) {
  const router = useRouter();
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const hasPortalTarget = useSyncExternalStore(
    subscribeToPortalTarget,
    getPortalTargetSnapshot,
    getServerPortalTargetSnapshot
  );

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Click outside to close the three-dot dropdown menu
  useEffect(() => {
    if (!activeMenuId) return;
    const handleDocumentClick = () => {
      setActiveMenuId(null);
    };
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [activeMenuId]);

  const handleLocationAction = async (action: 'add' | 'edit', id?: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    
    const params = new URLSearchParams();
    params.set('action', action);
    if (id) {
      params.set('id', id);
    }
    const queryString = `?${params.toString()}`;
    
    try {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      if (result.state === 'granted') {
        router.push(`/location/map${queryString}`);
      } else {
        router.push(`/location/access${queryString}`);
      }
    } catch {
      // Fallback if permissions API is not available
      router.push(`/location/access${queryString}`);
    }
    
    onClose();
  };

  const handleDeleteAddress = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    const stored = localStorage.getItem('user_addresses');
    if (!stored) return;
    
    try {
      const parsed = JSON.parse(stored);
      if (parsed.length <= 1) {
        alert("You must keep at least one address.");
        return;
      }
      
      const filtered = parsed.filter((a: any) => a.id !== id);
      localStorage.setItem('user_addresses', JSON.stringify(filtered));
      
      if (id === selectedAddressId) {
        const nextSelected = filtered[0].id;
        onSelectAddress(nextSelected);
        localStorage.setItem('selected_address_id', nextSelected);
      }
      
      onRefresh();
    } catch (err) {
      console.error("Failed to delete address", err);
    }
  };

  if (!hasPortalTarget) {
    return null;
  }

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-[100] bg-black/50 transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Address Selection"
        className={cn(
          'fixed inset-x-0 bottom-0 z-[100] flex flex-col bg-white',
          'rounded-t-[1.5rem] transition-transform duration-300 ease-out',
          'max-h-[90dvh]',
          open ? 'translate-y-0' : 'translate-y-full'
        )}
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 1rem)' }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2 shrink-0">
          <div className="h-1.5 w-12 rounded-full bg-[#E5E5E5]" />
        </div>

        {/* Header */}
        <div className="px-6 pt-2 pb-4 shrink-0 border-b border-gray-50 flex justify-between items-center">
          <div>
            <h2 className="text-[20px] font-bold text-black tracking-tight">
              Select Address
            </h2>
            <p className="mt-1 text-[14px] text-gray-500">
              Where do you want the service?
            </p>
          </div>
        </div>

        {/* Address List */}
        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-12">
          <div className="space-y-3">
            {addresses.map((address, index) => {
              const isSelected = address.id === selectedAddressId;
              const isLastItem = index === addresses.length - 1;
              return (
                <div
                  key={address.id}
                  onClick={() => {
                    onSelectAddress(address.id);
                    onClose();
                  }}
                  className={cn(
                    'w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all cursor-pointer relative',
                    isSelected
                      ? 'bg-[#F4F0FF] border-2 border-[#7B5CF5]'
                      : 'bg-white border-2 border-gray-100 hover:border-gray-200'
                  )}
                >
                  <div className="flex flex-col items-start gap-1 w-full pr-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          'text-[16px] font-bold leading-none',
                          isSelected ? 'text-[#7B5CF5]' : 'text-gray-800'
                        )}
                      >
                        {address.type}
                      </span>
                    </div>
                    <span className="text-[14px] text-gray-500 line-clamp-2 text-left">
                      {address.details}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0 relative">
                    {isSelected && (
                      <div className="h-6 w-6 rounded-full bg-[#7B5CF5] flex items-center justify-center shadow-lg shadow-[#7B5CF5]/20">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuId(activeMenuId === address.id ? null : address.id);
                      }}
                      className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full transition-colors hover:bg-gray-100"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="5" r="1.5"></circle>
                        <circle cx="12" cy="12" r="1.5"></circle>
                        <circle cx="12" cy="19" r="1.5"></circle>
                      </svg>
                    </button>

                    {activeMenuId === address.id && (
                      <div className="absolute right-9 top-1/2 -translate-y-1/2 z-[110] w-28 bg-white border border-gray-100 rounded-xl shadow-xl py-1 animate-in fade-in zoom-in-95 duration-150 origin-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuId(null);
                            handleLocationAction('edit', address.id, e);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-[#F4F0FF]/50 flex items-center gap-2 font-medium"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuId(null);
                            handleDeleteAddress(address.id, e);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 shrink-0">
          <button
            onClick={() => handleLocationAction('add')}
            className="w-full py-3.5 px-4 bg-[#7B5CF5]/10 text-[#7B5CF5] font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors hover:bg-[#7B5CF5]/20"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add New Address
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}

