import { APP_CONFIG } from '../../config/app-config.js';

export const SheetService = {
    async sendRegistration(data) {
        const url = APP_CONFIG.googleSheetURL;
        
        if (!url || url === "MASUKKAN_URL_GOOGLE_APPS_SCRIPT_ANDA_DISINI") {
            console.warn("URL Google Apps Script belum dikonfigurasi.");
            return false;
        }

        try {
            await fetch(url, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return true;
        } catch (error) {
            console.error('Gagal mengirim data ke Google Sheet:', error);
            return false;
        }
    }
};