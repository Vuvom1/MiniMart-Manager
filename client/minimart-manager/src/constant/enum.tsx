export enum Role {
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    STAFF = 'STAFF',
    CUSTOMER = 'CUSTOMER',
}

export enum SupplierStatus {
    ACTIVE = 'Active',
    INACTIVE = 'Inactive'
}

export enum ImportStatus {
    COMPLETED = 'Completed',   
    PENDING = 'Pending',     
    DELAYED = "Delayed", 
    IN_PROGRESS = 'In Progress', 
    CANCELLED = 'Cancelled',               
}

export enum CustomerStatus {
    ACTIVE = 'Active',   
    INACTIVE = 'Inactive',            
}

export enum PromotionStatus {
    DRAFT = 'Draft',
    SCHEDULED = 'Scheduled',
    ACTIVE = 'Active',
    PAUSED = 'Paused',
    EXPIRED = 'Expired',
    CANCELLED = 'Cancelled',
  }

export enum DiscountType {
    PERCENTAGE= 'Percentage',
    GET_MORE= 'Get More',
    FREE_GIFT= 'Free Gift',
}

export enum PromotionType {
    PRODUCT_BASED= 'Product-Based',
    ORDER_BASED= 'Order-Based',
}

export enum Period {
    DAILY = 'Daily',
    MONTHLY = 'Monthly',
    YEARLY = 'Yearly'
}

export enum BreakDuration {
    None = "00:00",
    Short = "00:15", 
    Medium = "00:30", 
    Long = "01:00",
}

export enum Time {
    AM_00_00 = "00:00 AM",
    AM_00_30 = "00:30 AM",
    AM_01_00 = "1:00 AM",
    AM_01_30 = "1:30 AM",
    AM_02_00 = "2:00 AM",
    AM_02_30 = "2:30 AM",
    AM_03_00 = "3:00 AM",
    AM_03_30 = "3:30 AM",
    AM_04_00 = "4:00 AM",
    AM_04_30 = "4:30 AM",
    AM_05_00 = "5:00 AM",
    AM_05_30 = "5:30 AM",
    AM_06_00 = "6:00 AM",
    AM_06_30 = "6:30 AM",
    AM_07_00 = "7:00 AM",
    AM_07_30 = "7:30 AM",
    AM_08_00 = "8:00 AM",
    AM_08_30 = "8:30 AM",
    AM_09_00 = "9:00 AM",
    AM_09_30 = "9:30 AM",
    AM_10_00 = "10:00 AM",
    AM_10_30 = "10:30 AM",
    AM_11_00 = "11:00 AM",
    AM_11_30 = "11:30 AM",
    PM_12_00 = "12:00 PM",
  }

  export enum TailwindColors {
    RED_200 = 'red-200',
    RED_300 = 'red-300',
    RED_400 = 'red-400',
    RED_500 = 'red-500',
  
    BLUE_200 = 'blue-200',
    BLUE_300 = 'blue-300',
    BLUE_400 = 'blue-400',
    BLUE_500 = 'blue-500',
   
    GREEN_200 = 'green-200',
    GREEN_300 = 'green-300',
    GREEN_400 = 'green-400',
    GREEN_500 = 'green-500',
  
    YELLOW_200 = 'yellow-200',
    YELLOW_300 = 'yellow-300',
    YELLOW_400 = 'yellow-400',
    YELLOW_500 = 'yellow-500',
   
    PURPLE_200 = 'purple-200',
    PURPLE_300 = 'purple-300',
    PURPLE_400 = 'purple-400',
    PURPLE_500 = 'purple-500',
   
    ORANGE_200 = 'orange-200',
    ORANGE_300 = 'orange-300',
    ORANGE_400 = 'orange-400',
    ORANGE_500 = 'orange-500',

    GRAY_200 = 'gray-200',
    GRAY_300 = 'gray-300',
    GRAY_400 = 'gray-400',
    GRAY_500 = 'gray-500',
 
    PINK_200 = 'pink-200',
    PINK_300 = 'pink-300',
    PINK_400 = 'pink-400',
    PINK_500 = 'pink-500',
}

export enum ColumnType {
    ID,
    STATUS,
    TEXT, 
    IMAGE,
    CHECK,  
    DATE,
    TIME,
    MONEY,
    DATETIME,
}

export enum ScheduleType {
    TEAM='Team',
    INDIVIDUAL='Individual',
}

export enum PaymentMethod {
    CASH = 'Cash',
    ONLINE = 'Online',  
}

export enum ProductStatus {
    IN_STOCK = 'In Stock',
    OUT_OF_STOCK = 'Out of Stock',
    UNAVAILABLE = 'Unavailable',
    EXPIRED= 'Expired',
}

export enum TransactionType {
    DELIVERY = 'Delivery',
    IN_STORE = 'In Store',
}

export enum ReceiptStatus {
    PENDING= 'Pending',
    PAID= 'Paid',
    CANCELLED= 'Cancelled',
}
  
export enum OrderStatus {
    PENDING= 'Pending',
    WAIT_FOR_PAYMENT= 'Wait for payment',
    PAID = 'Paid',
    CONFIRM= 'Confirm',
    DEVERING = 'Confirm',
    DELIVERED= 'Delivered',
    CANCELLED= 'Cancelled',
}

export enum EmployeeStatus {
    ACTIVE = 'Active',
    INACTIVE = 'Inactive',
    ON_LEAVE = 'On Leave',
}