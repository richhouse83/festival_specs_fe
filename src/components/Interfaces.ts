export interface Artist {
  artist_name: string;
  artist_key: string;
  date: string;
  start_time: string;
  end_time: string;
  type_of_show: string;
  pips_sent: boolean;
  specs_in: boolean;
  advance_contact: string;
  tour_manager_contact: string;
  production_manager_contact: string;
}

export interface Stage {
  stage_name: string;
  stage_key: string;
  capacity: number;
  location: string;
}

export interface Festival {
  festival_name: string;
  festival_key?: string;
  start_date: Date;
  end_date: Date;
}