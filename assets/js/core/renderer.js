export const Renderer = {
    appContainer: null,
    
    init() {
        this.appContainer = document.getElementById('app');
    },
    
    render(html, callback) {
        if (this.appContainer) {
            this.appContainer.innerHTML = html;
            
            try {
                if (window.lucide) {
                    window.lucide.createIcons();
                }
            } catch (e) {
                console.error("Gagal merender Lucide Icons:", e);
            }

            if (typeof callback === 'function') {
                try {
                    callback();
                } catch (e) {
                    console.error("Error saat menjalankan init modul:", e);
                }
            }
        }
    }
};
