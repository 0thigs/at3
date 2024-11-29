import { Client, Service } from '../types';

const STORAGE_KEYS = {
  CLIENTS: 'world-beauty-clients',
  SERVICES: 'world-beauty-services',
} as const;

export function saveClients(clients: Client[]): void {
  localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
}

export function loadClients(): Client[] {
  const stored = localStorage.getItem(STORAGE_KEYS.CLIENTS);
  return stored ? JSON.parse(stored) : [];
}

export function saveServices(services: Service[]): void {
  localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
}

export function loadServices(): Service[] {
  const stored = localStorage.getItem(STORAGE_KEYS.SERVICES);
  return stored ? JSON.parse(stored) : [];
}