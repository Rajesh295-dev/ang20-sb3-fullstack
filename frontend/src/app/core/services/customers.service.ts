import { Injectable, computed, signal } from '@angular/core';
import { CUSTOMERS_SEED } from '../data/customers.seed';
import { Customer } from '../models/customer.model';

@Injectable({ providedIn: 'root' })
export class CustomersService {
  private _customers = signal<Customer[]>([...CUSTOMERS_SEED]);
  customers = computed(() => this._customers()); // readonly view

  getAll(): Customer[] {
    return this._customers();
  }

  getById(id: number): Customer | undefined {
    return this._customers().find((c) => c.id === id);
  }

  searchByName(q: string): Customer[] {
    const k = q.trim().toLowerCase();
    if (!k) return this._customers();
    return this._customers().filter((c) => c.name.toLowerCase().includes(k));
  }

  add(c: Customer) {
    const maxId = Math.max(0, ...this._customers().map((x) => x.id));
    this._customers.set([
      ...this._customers(),
      { ...c, id: c.id ?? maxId + 1 },
    ]);
  }

  update(id: number, patch: Partial<Customer>) {
    this._customers.update((list) =>
      list.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    );
  }

  remove(id: number) {
    this._customers.update((list) => list.filter((c) => c.id !== id));
  }
}
