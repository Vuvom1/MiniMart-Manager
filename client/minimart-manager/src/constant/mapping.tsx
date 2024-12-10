import { CustomerStatus, DiscountType, ImportStatus, PromotionStatus, PromotionType, SupplierStatus } from "./enum";

export const statusStyleMapping: { [key: string]: string } = {
    Active: "bg-green-100 text-white text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300",
    Inactive: "bg-red-100 text-white text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300",
    Pending: "bg-gray-100 text-white text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300", 
};

export const supplierStatusColorMapping: {[key in SupplierStatus]: string} = {
  [SupplierStatus.ACTIVE]: 'green-200',
  [SupplierStatus.INACTIVE]: 'red-200',
};

export const importStatusColorMapping: { [key in ImportStatus]: string } = {
    [ImportStatus.COMPLETED]: 'green-200',
    [ImportStatus.PENDING]: 'yellow-200',
    [ImportStatus.DELAYED]: 'red-200',
    [ImportStatus.IN_PROGRESS]: 'blue-200',
    [ImportStatus.CANCELLED]: 'gray-200',
  };

export const customerStatusColorMapping: {[key in SupplierStatus]: string} = {
    [CustomerStatus.ACTIVE]: 'green-200',
    [CustomerStatus.INACTIVE]: 'gray-200',
  };

export const promotionStatusColorMapping: { [key in PromotionStatus]: string } = {
    [PromotionStatus.DRAFT]: 'gray-300',
    [PromotionStatus.SCHEDULED]: 'blue-300',
    [PromotionStatus.ACTIVE]: 'green-300',
    [PromotionStatus.PAUSED]: 'yellow-300',
    [PromotionStatus.EXPIRED]: 'red-300',
    [PromotionStatus.CANCELLED]: 'gray-400',
  };

  export const promotionTypeColorMapping: { [key in PromotionType]: string } = {
    [PromotionType.PRODUCT_BASED]: 'purple-500',       
    [PromotionType.ORDER_BASED]: 'blue-500',              
    [PromotionType.CUSTOMER_BASED]: 'orange-500',        
    // [PromotionType.BRAND_SUPPLIER_BASED]: 'yellow-500',   
    [PromotionType.ONLINE]: 'indigo-500',                
};


  export const discountTypeColorMapping: { [key in DiscountType]: string } = {
    [DiscountType.PERCENTAGE]: 'green-500',    
    [DiscountType.FIXED_AMOUNT]: 'blue-500',     
    [DiscountType.GET_MORE]: 'yellow-500',      
    [DiscountType.FREE_GIFT]: 'purple-500',     
};

export const promotionTypeToDiscountTypeMapping: { [key in PromotionType]: DiscountType[] } = {
  [PromotionType.PRODUCT_BASED]: [
      DiscountType.PERCENTAGE,
      DiscountType.FIXED_AMOUNT,
      DiscountType.GET_MORE,
      DiscountType.FREE_GIFT,
  ],
  [PromotionType.ORDER_BASED]: [
      DiscountType.PERCENTAGE,
      DiscountType.FIXED_AMOUNT,
  ],
  [PromotionType.CUSTOMER_BASED]: [
      DiscountType.PERCENTAGE,
      DiscountType.FIXED_AMOUNT,
  ],
  // [PromotionType.BRAND_SUPPLIER_BASED]: [
  //     DiscountType.PERCENTAGE,
  //     DiscountType.FIXED_AMOUNT,
  // ],
  [PromotionType.ONLINE]: [
      DiscountType.PERCENTAGE,
      DiscountType.FIXED_AMOUNT,
      DiscountType.FREE_GIFT,
  ],
};
  

export const tailwindColorMap: { [key: string]: string } = {
    "gray-50": "#F9FAFB",
    "gray-100": "#F3F4F6",
    "gray-200": "#E5E7EB",
    "gray-300": "#D1D5DB",
    "gray-400": "#9CA3AF",
    "gray-500": "#6B7280",
    "gray-600": "#4B5563",
    "gray-700": "#374151",
    "gray-800": "#1F2937",
    "gray-900": "#111827",

    "red-50": "#FEF2F2",
    "red-100": "#FEE2E2",
    "red-200": "#FECACA",
    "red-300": "#FCA5A5",
    "red-400": "#F87171",
    "red-500": "#EF4444",
    "red-600": "#DC2626",
    "red-700": "#B91C1C",
    "red-800": "#991B1B",
    "red-900": "#7F1D1D",

    "yellow-50": "#FFFBEB",
    "yellow-100": "#FEF3C7",
    "yellow-200": "#FDE68A",
    "yellow-300": "#FCD34D",
    "yellow-400": "#FBBF24",
    "yellow-500": "#F59E0B",
    "yellow-600": "#D97706",
    "yellow-700": "#B45309",
    "yellow-800": "#9A3400",
    "yellow-900": "#7C2D12",

    "green-50": "#ECFDF5",
    "green-100": "#D1FAE5",
    "green-200": "#A7F3D0",
    "green-300": "#6EE7B7",
    "green-400": "#34D399",
    "green-500": "#10B981",
    "green-600": "#059669",
    "green-700": "#047857",
    "green-800": "#065F46",
    "green-900": "#064E3B",

    "blue-50": "#EFF6FF",
    "blue-100": "#DBEAFE",
    "blue-200": "#BFDBFE",
    "blue-300": "#93C5FD",
    "blue-400": "#60A5FA",
    "blue-500": "#3B82F6",
    "blue-600": "#2563EB",
    "blue-700": "#1D4ED8",
    "blue-800": "#1E40AF",
    "blue-900": "#1E3A8A",

    "indigo-50": "#EEF2FF",
    "indigo-100": "#E0E7FF",
    "indigo-200": "#C7D2FE",
    "indigo-300": "#A5B4FC",
    "indigo-400": "#818CF8",
    "indigo-500": "#6366F1",
    "indigo-600": "#4F46E5",
    "indigo-700": "#4338CA",
    "indigo-800": "#3730A3",
    "indigo-900": "#312E81",

    "purple-50": "#F5F3FF",
    "purple-100": "#EDE9FE",
    "purple-200": "#DDD6FE",
    "purple-300": "#C4B5FD",
    "purple-400": "#A78BFA",
    "purple-500": "#8B5CF6",
    "purple-600": "#7C3AED",
    "purple-700": "#6D28D9",
    "purple-800": "#5B21B6",
    "purple-900": "#4C1D95",

    "pink-50": "#FDF2F8",
    "pink-100": "#FCE7F3",
    "pink-200": "#FBCFE8",
    "pink-300": "#F9A8D4",
    "pink-400": "#F472B6",
    "pink-500": "#EC4899",
    "pink-600": "#DB2777",
    "pink-700": "#BE185D",
    "pink-800": "#9D174D",
    "pink-900": "#831843",

    "teal-50": "#F0FDFA",
    "teal-100": "#CCFBF1",
    "teal-200": "#99F6E4",
    "teal-300": "#5EEAD4",
    "teal-400": "#2DD4BF",
    "teal-500": "#14B8A6",
    "teal-600": "#0D9488",
    "teal-700": "#0F766E",
    "teal-800": "#115E59",
    "teal-900": "#134E4A",

    "cyan-50": "#ECFEFF",
    "cyan-100": "#CFFAFE",
    "cyan-200": "#A5F3FC",
    "cyan-300": "#67E8F9",
    "cyan-400": "#22D3EE",
    "cyan-500": "#06B6D4",
    "cyan-600": "#0891B2",
    "cyan-700": "#0E7490",
    "cyan-800": "#155E75",
    "cyan-900": "#164E63",

    "orange-50": "#FFFBEB",
    "orange-100": "#FEF3C7",
    "orange-200": "#FDE68A",
    "orange-300": "#FCD34D",
    "orange-400": "#FBBF24",
    "orange-500": "#F59E0B",
    "orange-600": "#D97706",
    "orange-700": "#B45309",
    "orange-800": "#9A3400",
    "orange-900": "#7C2D12",
};


