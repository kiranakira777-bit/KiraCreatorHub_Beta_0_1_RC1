import { Store } from '../core/store.js';
import { Router } from '../core/router.js';
import { APP_CONFIG } from '../../config/app-config.js';

export const GateModule = {
    render() {
        const user = Store.get();
        if (!user) { Router.navigate('/auth'); return ''; }
        if (user.gatePassed) { Router.navigate('/beranda'); return ''; }

        return `
            <div class="auth-layout">
                <div class="card text-center">
                    <div style="margin-bottom: var(--space-lg);">
                        <i data-lucide="shield-check" style="width:48px; height:48px; color:var(--color-primary); margin: 0 auto var(--space-md);"></i>
                        <h1 class="mb-sm">Halo, ${user.nama}</h1>
                        <p class="subtitle">Sebagai bentuk dukungan kepada pengembang, silakan ikuti halaman Facebook Kira Kirana.</p>
                    </div>
                    
                    <button id="btnFollow" class="btn btn-primary mb-md">
                        <i data-lucide="external-link" style="width:18px; height:18px;"></i>
                        Ikuti Facebook Kira Kirana
                    </button>

                    <div id="countdownArea" style="display: none;" class="countdown-text">
                        <i data-lucide="clock" style="width:16px; height:16px;"></i>
                        Mohon tunggu <strong id="timerValue">10</strong> detik...
                    </div>

                    <div id="thankYouArea" style="display: none; margin-bottom: var(--space-md);">
                        <div class="notification notification-success" style="justify-content: center;">
                            <i data-lucide="heart" class="icon-success" style="width:18px; height:18px;"></i>
                            Terima kasih atas dukungannya.
                        </div>
                    </div>

                    <button id="btnEnter" class="btn btn-primary" style="display: none;">
                        <i data-lucide="arrow-right-circle" style="width:18px; height:18px;"></i>
                        Masuk ke Kira Creator Hub
                    </button>
                </div>
            </div>
        `;
    },
    
    init() {
        const btnFollow = document.getElementById('btnFollow');
        const countdownArea = document.getElementById('countdownArea');
        const thankYouArea = document.getElementById('thankYouArea');
        const btnEnter = document.getElementById('btnEnter');
        const timerValue = document.getElementById('timerValue');

        let countdownInterval;

        btnFollow.addEventListener('click', () => {
            window.open(APP_CONFIG.facebookURL, "_blank");
            
            btnFollow.disabled = true;
            btnFollow.innerHTML = `<i data-lucide="check" style="width:18px; height:18px;"></i> Tautan Dibuka`;
            window.lucide.createIcons();

            countdownArea.style.display = 'flex';
            let timeLeft = 10;
            timerValue.innerText = timeLeft;

            countdownInterval = setInterval(() => {
                timeLeft--;
                timerValue.innerText = timeLeft;

                if (timeLeft <= 0) {
                    clearInterval(countdownInterval);
                    countdownArea.style.display = 'none';
                    thankYouArea.style.display = 'block';
                    btnEnter.style.display = 'inline-flex';
                    window.lucide.createIcons();
                }
            }, 1000);
        });

        btnEnter.addEventListener('click', () => {
            Store.update('gatePassed', true);
            Router.navigate('/beranda');
        });
    }
};