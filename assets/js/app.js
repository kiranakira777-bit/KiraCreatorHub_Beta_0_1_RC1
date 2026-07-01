import { Renderer } from './core/renderer.js';
import { Router } from './core/router.js';
import { Store } from './core/store.js';

import { AuthModule } from './modules/auth.js';
import { GateModule } from './modules/gate.js';
import { HomeModule } from './modules/home.js';
import { CourseModule } from './modules/course.js';
import { VaultModule } from './modules/vault.js';
import { ProfileModule } from './modules/profile.js';

Router.register('/auth', AuthModule);
Router.register('/gate', GateModule);
Router.register('/beranda', HomeModule);
Router.register('/course', CourseModule);
Router.register('/vault', VaultModule);
Router.register('/profile', ProfileModule);

document.addEventListener('DOMContentLoaded', () => {
    Renderer.init();
    
    const user = Store.get();
    
    if (user && user.ingatSaya && user.gatePassed) {
        Router.navigate('/beranda');
    } else if (user && !user.gatePassed) {
        Router.navigate('/gate');
    } else if (user && user.gatePassed) {
        Router.navigate('/beranda');
    } else {
        Router.navigate('/auth');
    }

    Router.init();
});