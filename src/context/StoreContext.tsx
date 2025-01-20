"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

// Define Types
interface StoreConfig {
  _id: string;
  url: string;
  bucketId: string;
  isDeleted: boolean;
  __v: number;
}

interface AddressInfo {
  doorNo: string;
  street: string;
  state: string;
  pinCode: string;
}

interface Store {
  _id: string;
  location: string;
  currency: string;
  businessName: string;
  businessType: string[];
  storeConfig: StoreConfig;
  addressInfo: AddressInfo;
  __v: number;
  bannerConfig: {
    enable: boolean;
    list: string[];
  };
}

interface StoreData {
  statusCode: number;
  store: Store;
}

// Context Types
interface StoreContextProps {
  storeData: StoreData | null;
  setStoreData: Dispatch<SetStateAction<StoreData | null>>;
  banners: string[];
  loadBanners: () => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

// Create Context
const StoreContext = createContext<StoreContextProps | undefined>(undefined);

// Context Provider Component
export const StoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [banners, setBanners] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load banners when store data changes
  useEffect(() => {
    if (storeData?.store?.bannerConfig?.list) {
      setIsLoading(true);
      const filteredBanners = storeData.store.bannerConfig.list.filter(
        (banner) => banner !== null
      );
      setBanners(filteredBanners);
      setIsLoading(false);
    }
  }, [storeData]);

  const loadBanners = () => {
    if (storeData?.store?.bannerConfig?.list) {
      setIsLoading(true);
      const filteredBanners = storeData.store.bannerConfig.list.filter(
        (banner) => banner !== null
      );
      setBanners(filteredBanners);
      setIsLoading(false);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        storeData,
        setStoreData,
        banners,
        loadBanners,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

// Custom Hook
export const useStore = (): StoreContextProps => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
