enum StorageType {
  Local,
  Session
}

class StorageClass {
  storage: Storage

  constructor(type: StorageType) {
    this.storage = type === StorageType.Local ? localStorage : sessionStorage
  }

  setItem(key: string, value: any) {
    if (value) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  getItem(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  removeItem(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}

const localCache = new StorageClass(StorageType.Local)
const sessionCache = new StorageClass(StorageType.Session)

export { localCache, sessionCache }
