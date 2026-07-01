import { Store } from '../core/store.js';
import { Router } from '../core/router.js';
import { Footer } from '../components/footer.js';
import { facebookCourseData } from '../../data/facebook-course.js';

export const HomeModule = {
    calculateProgress() {
        const user = Store.get();
        if (!user || !user.progress) return 0;
        const completedCount = Object.values(user.progress).filter(Boolean).length;
        return Math.round((completedCount / facebookCourseData.length) * 100);
    },

    render() {
        const user = Store.get();
        if (!user) { Router.navigate('/auth'); return ''; }
        
        const progress = this.calculateProgress();

        return `
            <div class="app-layout">
                <header class="app-header">
                    <i data-lucide="sparkles" style="width:20px; height:20px; color:var(--color-primary)"></i>
                    <strong>Kira Creator Hub</strong>
                </header>
                
                <main class="app-content">
                    <h1 style="font-size:22px; margin-bottom:var(--space-sm);">Halo, ${user.nama}</h1>
                    <p class="subtitle mb-xl">Selamat datang kembali. Lanjutkan belajar you!</p>

                    <div class="card mb-xl" style="border-left: 4px solid var(--color-primary);">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-sm);">
                            <strong style="font-size:14px;">Progress Belajar</strong>
                            <span style="font-size:14px; font-weight:700; color:var(--color-primary);">${progress}%</span>
                        </div>
                        <div style="width:100%; height:8px; background:var(--color-border); border-radius:4px; overflow:hidden;">
                            <div style="width:${progress}%; height:100%; background:var(--color-primary); border-radius:4px; transition: width 0.5s ease;"></div>
                        </div>
                    </div>

                    <div class="menu-grid">
                        <div class="menu-card" data-route="/course">
                            <div class="menu-card-icon"><i data-lucide="play-circle" style="width:20px;height:20px;"></i></div>
                            <div class="menu-card-info">
                                <div class="menu-card-title">Belajar Monetisasi Facebook</div>
                                <div class="menu-card-status status-available">Tersedia</div>
                            </div>
                        </div>

                        <div class="menu-card disabled">
                            <div class="menu-card-icon" style="background:rgba(0,0,0,0.05); color:var(--color-text-disabled);"><i data-lucide="link" style="width:20px;height:20px;"></i></div>
                            <div class="menu-card-info">
                                <div class="menu-card-title">Belajar Affiliate Facebook</div>
                                <div class="menu-card-status">Segera Hadir</div>
                            </div>
                        </div>

                        <div class="menu-card disabled">
                            <div class="menu-card-icon" style="background:rgba(0,0,0,0.05); color:var(--color-text-disabled);"><i data-lucide="file-text" style="width:20px;height:20px;"></i></div>
                            <div class="menu-card-info">
                                <div class="menu-card-title">Materi Konten</div>
                                <div class="menu-card-status">Segera Hadir</div>
                            </div>
                        </div>

                        <div class="menu-card" data-route="/vault">
                            <div class="menu-card-icon"><i data-lucide="lock" style="width:20px;height:20px;"></i></div>
                            <div class="menu-card-info">
                                <div class="menu-card-title">Creator Vault</div>
                                <div class="menu-card-status" style="color:#D97706;">Dalam Pengembangan</div>
                            </div>
                        </div>

                        <div class="menu-card" data-route="/profile">
                            <div class="menu-card-icon"><i data-lucide="user-circle" style="width:20px;height:20px;"></i></div>
                            <div class="menu-card-info">
                                <div class="menu-card-title">Profil Saya</div>
                                <div class="menu-card-status">Pengaturan Akun</div>
                            </div>
                        </div>
                    </div>

                    ${Footer()}
                </main>
            </div>
        `;
    },
    
    init() {
        const cards = document.querySelectorAll('.menu-card:not(.disabled)');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const route = card.getAttribute('data-route');
                if (route) Router.navigate(route);
            });
        });
    }
};