import type { LucideIcon } from "lucide-react";

export type UserRole = 'user' | 'donor' | 'admin';
export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
}