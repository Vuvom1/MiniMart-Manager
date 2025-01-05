const baseCustomerUrl = "/minimartonline";
const baseAdminUrl = "/admin";

function createUrl(base: string, path: string) {
  return {
    Route: `/${path}`,
    Path: `${base}/${path}`,
  };
}

const Urls = Object.freeze({
  CUSTOMER: {
    BASE: baseCustomerUrl,
    LOGIN: createUrl(baseCustomerUrl, "login"),
    SIGNUP: createUrl(baseCustomerUrl, "signup"),
    CATEGORRY: {
      BASE: createUrl(baseCustomerUrl, "category"),
      DETAIL: createUrl(baseCustomerUrl, "category/:id"),  
    },
    PRODUCT: createUrl(baseCustomerUrl, "product/:id"),
    CHECKOUT: createUrl(baseCustomerUrl, "checkout"),
    ORDER_TRACKING: createUrl(baseCustomerUrl, "order-tracking"),
    PROFILE: createUrl(baseCustomerUrl, "profile"), 
  },
  ADMIN: {
    BASE: baseAdminUrl,
    LOGIN: createUrl(baseAdminUrl, "login"),
    SIGNUP: createUrl(baseAdminUrl, "signup"),
    SUPPLIES: {
      BASE: createUrl(baseAdminUrl, "supplies"),
      IMPORTS: {
        BASE: createUrl(baseAdminUrl, "supplies/imports"),
        ADD: createUrl(baseAdminUrl, "supplies/imports/add"),
        EDIT: createUrl(baseAdminUrl, "supplies/imports/:id"),
      },
    },
    PROMOTIONS: {
      BASE: createUrl(baseAdminUrl, "promotions"),
      ADD: createUrl(baseAdminUrl, "promotions/add"),
      EDIT: createUrl(baseAdminUrl, "promotions/:id"),
    },
    CUSTOMERS: createUrl(baseAdminUrl, "customers"),
    SCHEDULE: createUrl(baseAdminUrl, "schedule"),
    DASHBOARD: createUrl(baseAdminUrl, "dashboard"),
    ORDER: {
      BASE: createUrl(baseAdminUrl, "orders"),
      DETAIL: createUrl(baseAdminUrl, "orders/:id"),
    },
    PRODUCT: {
      BASE: createUrl(baseAdminUrl, "products"),
      ADD: createUrl(baseAdminUrl, "products/add"),
      EDIT: createUrl(baseAdminUrl, "products/:id"),
    },
    EMPLOYEE: {
      BASE: createUrl(baseAdminUrl, "employees"),
      ADD: createUrl(baseAdminUrl, "employees/add"),
      DETAILS: createUrl(baseAdminUrl, "employees/:id"),
    },
    RECEIPT: {
      BASE: createUrl(baseAdminUrl, "receipts"),
      ADD: createUrl(baseAdminUrl, "receipts/add"),
    },
    USER_PROFILE: createUrl(baseAdminUrl, "user-profile"),
    UNAUTHORIZED: createUrl(baseAdminUrl, "unauthorized"),
  },
});

export default Urls;
