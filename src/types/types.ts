export interface DataI {
  id: number;
  guid: string;
  customer: string;
  asset_type: string;
  serial_number: string;
  service_contract: boolean;
  warranty: boolean;
}

export interface ChartI {
  data: number[];
  setShowValidContract: (val: boolean | null) => void;
  setShowValidWarranty: (val: boolean | null) => void;
}
