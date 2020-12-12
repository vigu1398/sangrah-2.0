import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppCacheService {

  //Store a key value pair in cache
  private cache = {};

  constructor() { }

  //Sets an key:value pair in cache
  public setItem(key, value) {
    this.cache[key] = value;
  }

  //Returns value corresponding to a key
  public getItem(key) {
    return this.cache[key];
  }

  //Removes a key value pair from cache
  public removeItem(key) {
    if (key && this.cache[key]) {
      delete this.cache[key];
    }
  }

  //Returns if an item exists in the cache or not
  public isItem(key) {
    return this.cache[key] ? true : false;
  }

  //Clear cache
  public clear() {
    this.cache = {};
  }

}
