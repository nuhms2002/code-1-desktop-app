export interface JobData {
    id: number;
    job_date: string;
    passenger_name: string;
    passenger_phone: string;
    pick_up_time: string;
    appointment_time: string;
    trip_type: string;
    start_address: string; 
    drop_off_address: string;
    second_drop_off_address?: string;
    driver: string;
    total_charge: string;
  }
  

  