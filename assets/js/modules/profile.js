import { Store } from '../core/store.js';
import { Router } from '../core/router.js';
import { Footer } from '../components/footer.js';

export const ProfileModule = {
    render() {
        const user = Store.get();
        if (!user) { Router.navigate('/auth'); return ''; }

        const joinDate = new Date(user.joinDate).toLocaleDateString('id-ID', { 
            year: 'numeric', month: 'long', day: 'numeric' 
        });

        return `
            <div class="app-layout">
                <header class="app-header">
                    <div style="cursor:pointer;" id="btnBack"><i data-lucide="arrow-left" style="width:20px; height:20px;"></i></div>
                    <strong>Profil Saya</strong>
                </header>
                
                <main class="app-content" style="max-width:480px; margin-top:var(--space-xl);">
                    <div style="text-align:center; margin-bottom:var(--space-xl);">
                        <div style="width:80px; height:80px; border-radius:50%; background:var(--color-border); margin:0 auto var(--space-md); display:flex; align-items:center; justify-content:center;">
                            <i data-lucide="user" style="width:40px; height:40px; color:var(--color-text-secondary);"></i>
                        </div>
                        <h2>${user.nama}</h2>
                    </div>

                    <div class="card mb-md">
                        <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-md);">
                            <span style="color:var(--color-text-secondary); font-size:14px;">Nomor WhatsApp</span>
                            <strong style="font-size:14px;">${user.whatsapp}</strong>
                        </div>
                        <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-md);">
                            <span style="color:var(--color-text-secondary); font-size:14px;">Status FB Pro</span>
                            <strong style="font-size:14px;">${user.fbPro}</strong>
                        </div>
                        <div style="display:flex; justify-content:space-between;">
                            <span style="color:var(--color-text-secondary); font-size:14px;">Tanggal Bergabung</span>
                            <strong style="font-size:14px;">${joinDate}</strong>
                        </div>
                    </div>

                    <button id="btnReset" class="btn" style="background:#FEF2F2; color:#EF4444; margin-bottom:var(--space-md);">
                        <i data-lucide="refresh-cw" style="width:18px;height:18px;"></i> Reset Progress Belajar
                    </button>

                    <button id="btnLogout" class="btn" style="background:var(--color-bg); color:var(--color-text);">
                        <i data-lucide="log-out" style="width:18px;height:18px;"></i> Keluar
                    </button>

                    ${Footer()}
                </main>
            </div>
        `;
    },
    
    init() {
        document.getElementById('btnBack')?.addEventListener('click', () => Router.navigate('/beranda'));
        
        document.getElementById('btnReset')?.addEventListener('click', () => {
            if(confirm("Apakah Anda yakin ingin menghapus semua progress belajar?")) {
                Store.update('progress', {});
                Router.navigate('/beranda');
            }
        });

        document.getElementById('btnLogout')?.addEventListener('click', () => {
            Store.clear();
            Router.navigate('/auth');
        });
    }
};