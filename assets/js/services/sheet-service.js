import { APP_CONFIG } from '../../../config/app-config.js'; // PATH BENAR

export const SheetService = {
    async sendRegistration(data) {
        const url = APP_CONFIG.googleSheetURL;
        if (!url || url === "MASUKKAN_URL_GOOGLE_APPS_SCRIPT_ANDA_DISINI") return false;
        try {
            await fetch(url, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
            return true;
        } catch (error) { return false; }
    }
};
