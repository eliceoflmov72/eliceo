import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  /**
   * Obtiene un valor del storage usando las APIs modernas cuando sea posible
   * @param key Clave del valor a obtener
   * @returns Promise con el valor o null si no existe
   */
  async getItem(key: string): Promise<string | null> {
    // Usar navigator.storage si está disponible (moderno)
    if ('storage' in navigator && navigator.storage && 'persist' in navigator.storage) {
      try {
        // Intentar usar la API moderna
        const storage = await navigator.storage.persist();
        if (storage) {
          return localStorage.getItem(key);
        }
      } catch (error) {
        console.warn('navigator.storage.persist() no disponible, usando localStorage como fallback');
      }
    }
    
    // Fallback a localStorage
    return localStorage.getItem(key);
  }

  /**
   * Establece un valor en el storage usando las APIs modernas cuando sea posible
   * @param key Clave del valor
   * @param value Valor a almacenar
   */
  async setItem(key: string, value: string): Promise<void> {
    // Usar navigator.storage si está disponible (moderno)
    if ('storage' in navigator && navigator.storage && 'persist' in navigator.storage) {
      try {
        // Intentar usar la API moderna
        const storage = await navigator.storage.persist();
        if (storage) {
          localStorage.setItem(key, value);
          return;
        }
      } catch (error) {
        console.warn('navigator.storage.persist() no disponible, usando localStorage como fallback');
      }
    }
    
    // Fallback a localStorage
    localStorage.setItem(key, value);
  }

  /**
   * Elimina un valor del storage
   * @param key Clave del valor a eliminar
   */
  async removeItem(key: string): Promise<void> {
    // Usar navigator.storage si está disponible (moderno)
    if ('storage' in navigator && navigator.storage && 'persist' in navigator.storage) {
      try {
        // Intentar usar la API moderna
        const storage = await navigator.storage.persist();
        if (storage) {
          localStorage.removeItem(key);
          return;
        }
      } catch (error) {
        console.warn('navigator.storage.persist() no disponible, usando localStorage como fallback');
      }
    }
    
    // Fallback a localStorage
    localStorage.removeItem(key);
  }

  /**
   * Limpia todo el storage
   */
  async clear(): Promise<void> {
    // Usar navigator.storage si está disponible (moderno)
    if ('storage' in navigator && navigator.storage && 'persist' in navigator.storage) {
      try {
        // Intentar usar la API moderna
        const storage = await navigator.storage.persist();
        if (storage) {
          localStorage.clear();
          return;
        }
      } catch (error) {
        console.warn('navigator.storage.persist() no disponible, usando localStorage como fallback');
      }
    }
    
    // Fallback a localStorage
    localStorage.clear();
  }

  /**
   * Verifica si el storage persistente está disponible
   * @returns Promise que resuelve a true si está disponible
   */
  async isPersistentStorageAvailable(): Promise<boolean> {
    if ('storage' in navigator && navigator.storage && 'persist' in navigator.storage) {
      try {
        const storage = await navigator.storage.persist();
        return storage;
      } catch (error) {
        return false;
      }
    }
    return false;
  }
}

