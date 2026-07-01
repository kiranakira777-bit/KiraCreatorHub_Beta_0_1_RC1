import { Store } from '../core/store.js';
import { Router } from '../core/router.js';
import { SheetService } from '../services/sheet-service.js';

export const AuthModule = {
    render() {
        return `
            <div class="auth-layout">
                <div class="card">
                    <div class="text-center mb-xl">
                        <h1 class="mb-sm">Kira Creator Hub</h1>
                        <p class="subtitle">Belajar Monetisasi Konten & Affiliate Marketing secara Gratis.</p>
                    </div>
                    
                    <div id="notificationArea"></div>

                    <form id="registerForm">
                        <div class="form-group">
                            <label class="form-label" for="nama">Nama *</label>
                            <div style="position: relative;">
                                <i data-lucide="user" style="position:absolute; left:14px; top:50%; transform:translateY(-50%); width:18px; height:18px; color:var(--color-text-secondary)"></i>
                                <input type="text" id="nama" class="form-input" style="padding-left: 42px;" placeholder="Masukkan nama lengkap" required>
                            </div>
                            <div class="error-message" id="namaError">Nama wajib diisi</div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="whatsapp">Nomor WhatsApp *</label>
                            <div style="position: relative;">
                                <i data-lucide="smartphone" style="position:absolute; left:14px; top:50%; transform:translateY(-50%); width:18px; height:18px; color:var(--color-text-secondary)"></i>
                                <input type="tel" id="whatsapp" class="form-input" style="padding-left: 42px;" placeholder="Contoh: 081234567890" required>
                            </div>
                            <div class="error-message" id="whatsappError">Nomor hanya boleh angka & minimal 10 digit</div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Sudah memiliki Facebook Professional Mode? (Opsional)</label>
                            <div class="choice-group">
                                <input type="radio" id="fbYa" name="fbPro" value="Ya" class="choice-input">
                                <label for="fbYa" class="choice-label">Ya</label>
                            </div>
                            <div class="choice-group">
                                <input type="radio" id="fbBelum" name="fbPro" value="Belum" class="choice-input">
                                <label for="fbBelum" class="choice-label">Belum</label>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <div class="choice-group">
                                <input type="checkbox" id="ingatSaya" class="choice-input">
                                <label for="ingatSaya" class="choice-label">Ingat Saya</label>
                            </div>
                        </div>
                        
                        <button type="submit" id="btnDaftar" class="btn btn-primary" disabled>
                            <i data-lucide="log-in" style="width:18px; height:18px;"></i>
                            Daftar Gratis
                        </button>
                    </form>
                </div>
            </div>
        `;
    },
    
    init() {
        const form = document.getElementById('registerForm');
        const namaInput = document.getElementById('nama');
        const whatsappInput = document.getElementById('whatsapp');
        const btnDaftar = document.getElementById('btnDaftar');
        const notifArea = document.getElementById('notificationArea');
        
        const validateForm = () => {
            const namaValid = namaInput.value.trim() !== '';
            const waValue = whatsappInput.value.trim();
            const waIsValid = /^\d{10,}$/.test(waValue); 
            
            const showNamaError = !namaValid && namaInput.value.length > 0;
            document.getElementById('namaError').style.display = showNamaError ? 'block' : 'none';
            namaInput.classList.toggle('error', showNamaError);

            const showWaError = waValue.length > 0 && !waIsValid;
            document.getElementById('whatsappError').style.display = showWaError ? 'block' : 'none';
            whatsappInput.classList.toggle('error', showWaError);

            btnDaftar.disabled = !(namaValid && waIsValid);
        };

        namaInput.addEventListener('input', validateForm);
        whatsappInput.addEventListener('input', validateForm);

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const nama = namaInput.value.trim();
            const whatsapp = whatsappInput.value.trim();
            const fbPro = document.querySelector('input[name="fbPro"]:checked')?.value || 'Tidak diisi';
            const ingatSaya = document.getElementById('ingatSaya').checked;

            btnDaftar.disabled = true;
            btnDaftar.innerHTML = `<i data-lucide="loader-2" style="width:18px; height:18px; animation: spin 1s linear infinite;"></i> Memproses...`;
            window.lucide.createIcons();

            const now = new Date();
            const sheetData = {
                nama, nomorWhatsApp: whatsapp, statusFBPro: fbPro,
                tanggal: now.toLocaleDateString('id-ID'),
                jam: now.toLocaleTimeString('id-ID'),
                browser: navigator.userAgent,
                device: navigator.platform
            };

            const sheetSuccess = await SheetService.sendRegistration(sheetData);

            const userData = {
                nama, whatsapp, fbPro, ingatSaya,
                gatePassed: false, 
                joinDate: now.toISOString(),
                progress: {}
            };
            Store.save(userData);

            if (sheetSuccess) {
                notifArea.innerHTML = `
                    <div class="notification notification-success">
                        <i data-lucide="check-circle" class="icon-success" style="width:20px; height:20px;"></i>
                        Pendaftaran berhasil! Mengalihkan...
                    </div>`;
            } else {
                notifArea.innerHTML = `
                    <div class="notification notification-warning">
                        <i data-lucide="alert-circle" class="icon-warning" style="width:20px; height:20px;"></i>
                        Data lokal tersimpan. Server sedang gangguan, Anda tetap dapat melanjutkan.
                    </div>`;
            }
            window.lucide.createIcons();

            setTimeout(() => {
                Router.navigate('/gate');
            }, 1500);
        });
    }
};