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
  front_of_house_engineer:  boolean;
  extras: string;
  monitor_engineer: boolean;
  lighting_designer: boolean;
  video_engineer: boolean;
  artic_trucks: number;
  tour_busses: number;
  bus_trailers: number;
  campervans: number;
  splitter_vans: number;
  vans: number;
  cars: number;
  arrival_on_site: string;
  load_in_time: string;
  sound_check_start: string;
  sound_check_end: string;
  touring_foh_desk: boolean;
  touring_monitor_desk: boolean;
  touring_lighting_desk: boolean;
  touring_video_desk: boolean;
  floor_package: boolean;
  touring_set: boolean;
  touring_sfx: boolean;
  department_requirements: string;
  riser_requirements: string;
  backdrop: boolean;
  screen_use: boolean;
  source: boolean;
  follow_spot_use: boolean;
  touring_production_info: string;
  house_production_info: string;
  festival_extras: string;
  djm_type: string;
  djm_quantity: number;
  cdj_type: string;
  cdj_quantity: number;
  '1210_type': string;
  '1210_quantity': number;
  dj_extras: string;
  internet: string;
  supplier_notes: string;
  '28t_trucks': number;
  '18t_trucks': number;
  '7_5t_trucks': number;
}

export interface Stage {
  stage_name: string;
  stage_key: string;
  capacity: number;
  location: string;
  production_manager: string;
  stage_manager: string;
  audio_supplier: string;
  lx_supplier: string;
  video_supplier: string;
  'structure/stage_type/supplier': string;
  djm_type: string;
  djm_quantity: number;
  cdj_type: string;
  cdj_quantity: number;
  '1210_type': string;
  '1210_quantity': number;
  risers: number;
  available_risers: string;
}

export interface Festival {
  festival_name: string;
  festival_key?: string;
  start_date: Date;
  end_date: Date;
}