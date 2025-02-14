export type SearchData = {
  name: string;
};

export type UpdatedVariant = {
  choices: { [key: string]: string }; // Example: { Size: 'Small', Color: 'green' }
  variant: {
    priceData: any; // Adjust this based on actual data type
    convertedPriceData: any; // Adjust this based on actual data type
    weight: number;
    sku: string;
    visible: boolean;
  };
  stock: {
    trackQuantity: boolean;
    inStock: boolean;
  };
  _id: string;
};
