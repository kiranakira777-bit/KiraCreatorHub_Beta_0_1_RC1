import { Router } from '../core/router.js';
import { Footer } from '../components/footer.js';

export const VaultModule = {
    render() {
        return `
            <div class="app-layout">
                <header class="app-header">
                    <div style="cursor:pointer;" id="btnBack"><i data-lucide="arrow-left" style="width:20px; height:20px;"></i></div>
                    <strong>Creator Vault</strong>
                </header>
                
                <main class="app-content" style="max-width:600px; text-align:center; margin-top:60px;">
                    <div style="margin-bottom:var(--space-lg);">
                        <i data-lucide="lock" style="width:48px; height:48px; color:var(--color-text-disabled); margin:0 auto var(--space-md);"></i>
                        <h2 style="margin-bottom:var(--space-sm);">Sedang Dipersiapkan</h2>
                        <p class="subtitle">Creator Vault sedang dalam tahap pengembangan. Nantikan fitur-fitur menarik ini!</p>
                    </div>
                    
                    <div class="card" style="text-align:left;">
                        <ul style="list-style:none; display:flex; flex-direction:column; gap:12px; color:var(--color-text-secondary); font-size:15px;">
                            <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="zap" style="width:16px;height:16px;color:var(--color-primary);"></i> Hook</li>
                            <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="type" style="width:16px;height:16px;color:var(--color-primary);"></i> Caption</li>
                            <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="brain" style="width:16px;height:16px;color:var(--color-primary);"></i> Prompt AI</li>
                            <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="layout" style="width:16px;height:16px;color:var(--color-primary);"></i> Storyboard</li>
                            <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="file" style="width:16px;height:16px;color:var(--color-primary);"></i> Template</li>
                            <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="lightbulb" style="width:16px;height:16px;color:var(--color-primary);"></i> Ide Konten</li>
                        </ul>
                    </div>

                    <p class="subtitle" style="margin-top:var(--space-lg); font-size:13px;">Akses Premium akan tersedia pada versi berikutnya.</p>

                    ${Footer()}
                </main>
            </div>
        `;
    },
    
    init() {
        document.getElementById('btnBack')?.addEventListener('click', () => Router.navigate('/beranda'));
    }
};