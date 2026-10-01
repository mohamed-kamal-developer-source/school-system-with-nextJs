/** Data shapes returned by the booking API for the admin screens. */
export type BookingStatus = "pending" | "cancelled" | "completed" | "confirmed";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  password: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  price: number | string;
  duration: number | string;
  category: string;
  image_url?: string;
}

export interface ServicePayload {
  name: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  image_url: string;
}

export interface Booking {
  id: number;
  user_id: number;
  service_name: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  price: number | string;
  status: BookingStatus;
}
