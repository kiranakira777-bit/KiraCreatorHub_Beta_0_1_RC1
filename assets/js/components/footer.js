import { APP_CONFIG } from '../../config/app-config.js';

export const Footer = () => {
    return `
        <footer style="text-align: center; padding: 32px 16px 24px; color: var(--color-text-secondary); font-size: 13px; line-height: 1.6; margin-top: 40px;">
            <strong>${APP_CONFIG.name}</strong><br>
            Versi ${APP_CONFIG.version}<br>
            © indraGod ☮︎ 2026
        </footer>
    `;
};