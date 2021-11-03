export interface CarInterface {
  id: string;
  brand: string;
  name: string;
  about: string;
  rent: RentInterface;
  fuel_type: string;
  thumbnail: string;
  accessories: AccessoryInterface[];
  photos: string[];
}

export interface AccessoryInterface {
  type: string;
  name: string;
}

export interface RentInterface {
  period: string;
  price: number;
}
