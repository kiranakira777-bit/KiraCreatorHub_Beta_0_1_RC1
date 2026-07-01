import { Renderer } from './renderer.js';

export const Router = {
    routes: {},
    
    register(path, module) {
        this.routes[path] = module;
    },
    
    navigate(path) {
        window.location.hash = path;
    },
    
    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute();
    },
    
    handleRoute() {
        const path = window.location.hash.slice(1) || '/auth';
        const module = this.routes[path];
        
        if (module) {
            Renderer.render(module.render(), module.init);
        } else {
            Renderer.render(`<div class="auth-layout"><div class="card text-center"><h2>Halaman tidak ditemukan</h2></div></div>`, null);
        }
    }
};