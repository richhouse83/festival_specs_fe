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
  risers_required: string;
  backdrop: boolean;
  screen_use: boolean;
  source: boolean;
  follow_spot_use: boolean;
  touring_extras: string;
  touring_extras_agreed: boolean;
  festival_extras: string;
  festival_extras_agreed: boolean;
  djm: string;
  cdj: string;
  '1210': string;
  dj_extras: string;
  internet: string;
  supplier_notes: string;
  '28t_trucks': string;
  '18t_trucks': string;
  '7_5t_trucks': string;
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