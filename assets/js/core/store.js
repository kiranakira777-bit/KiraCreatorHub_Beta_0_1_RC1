const STORE_KEY = 'kira_creator_hub';

export const Store = {
    get() {
        const data = localStorage.getItem(STORE_KEY);
        return data ? JSON.parse(data) : null;
    },
    save(data) {
        localStorage.setItem(STORE_KEY, JSON.stringify(data));
    },
    update(path, value) {
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
    },
    clear() {
        localStorage.removeItem(STORE_KEY);
    }
};