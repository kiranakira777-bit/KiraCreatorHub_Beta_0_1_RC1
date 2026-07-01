const STORE_KEY = 'kira_creator_hub';

export const Store = {
    get() {
        try {
            const data = localStorage.getItem(STORE_KEY);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error("LocalStorage tidak dapat diakses (get).", e);
            return null;
        }
    },
    save(data) {
        try {
            localStorage.setItem(STORE_KEY, JSON.stringify(data));
        } catch (e) {
            console.error("LocalStorage tidak dapat diakses (save).", e);
        }
    },
    update(path, value) {
        try {
            const data = this.get() || {};
            const keys = path.split('.');
            let current = data;
            
            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                if (current[key] === undefined || typeof current[key] !== 'object') {
                    current[key] = {};
                }
                current = current[key];
            }
            
            current[keys[keys.length - 1]] = value;
            this.save(data);
        } catch (e) {
            console.error("Gagal update LocalStorage.", e);
        }
    },
    clear() {
        try {
            localStorage.removeItem(STORE_KEY);
        } catch (e) {
            console.error("Gagal menghapus LocalStorage.", e);
        }
    }
};
