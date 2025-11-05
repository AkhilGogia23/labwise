import { Test } from "./test";

export interface Lab {
     id: number;
  name: string;
  address: string;
  city: string;
  contact: string;
  rating: number;
  accreditation: string;
  location: { lat: number; lng: number };
  tests: Test[];
}


