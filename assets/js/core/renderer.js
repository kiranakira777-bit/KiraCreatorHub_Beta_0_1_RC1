export const Renderer = {
    appContainer: null,
    
    init() {
        this.appContainer = document.getElementById('app');
    },
    
    render(html, callback) {
        if (this.appContainer) {
            this.appContainer.innerHTML = html;
            if (window.lucide) {
                window.lucide.createIcons();
            }
            if (typeof callback === 'function') {
                callback();
            }
        }
    }
};