export interface Driver {
  id: string;
  name: string;
  phone: string;
  active: boolean;
}

// This is used to add the drivers list in the delivery assigning menu in the order ticket
export interface DriverMenu {
  id: string;
  name: string;
  phone: string;
}
