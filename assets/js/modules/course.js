import { Store } from '../core/store.js';
import { Router } from '../core/router.js';
import { Footer } from '../components/footer.js';
import { facebookCourseData } from '../../data/facebook-course.js';

export const CourseModule = {
    currentLessonIndex: 0,

    formatText(text) {
        if (!text) return '';
        let formatted = text.replace(/\n\n/g, '</p><p>');
        formatted = formatted.replace(/\n/g, '<br>');
        return `<p>${formatted}</p>`;
    },

    render() {
        const user = Store.get();
        if (!user) { Router.navigate('/auth'); return ''; }

        return `
            <div class="app-layout">
                <header class="app-header">
                    <div style="cursor:pointer;" id="btnBack"><i data-lucide="arrow-left" style="width:20px; height:20px;"></i></div>
                    <strong>Belajar Monetisasi Facebook</strong>
                </header>
                
                <main class="app-content" id="courseContainer"></main>
            </div>
        `;
    },

    renderLesson() {
        const user = Store.get();
        const lesson = facebookCourseData[this.currentLessonIndex];
        const isCompleted = user.progress && user.progress[lesson.id];
        const totalLessons = facebookCourseData.length;

        const container = document.getElementById('courseContainer');
        if(!container) return;

        container.innerHTML = `
            <div class="course-layout">
                <aside class="course-sidebar">
                    <div class="sidebar-card">
                        <div style="padding:var(--space-sm) var(--space-md); font-size:13px; font-weight:600; color:var(--color-text-secondary);">DAFTAR MATERI</div>
                        ${facebookCourseData.map((item, index) => `
                            <div class="sidebar-item ${index === this.currentLessonIndex ? 'active' : ''}" data-index="${index}">
                                <div class="sidebar-check ${user.progress && user.progress[item.id] ? 'completed' : ''}">
                                    ${user.progress && user.progress[item.id] ? '<i data-lucide="check" style="width:12px;height:12px;"></i>' : ''}
                                </div>
                                <span style="font-size: 13px;">${item.judul.split(':')[0]}</span>
                            </div>
                        `).join('')}
                    </div>
                </aside>
                
                <section class="course-content">
                    <h2 style="margin-bottom:var(--space-sm);">${lesson.judul}</h2>
                    <div class="course-meta">
                        <i data-lucide="clock" style="width:14px; height:14px;"></i>
                        <span>${lesson.estimasiWaktuBaca}</span>
                    </div>

                    <div class="content-body">
                        ${this.formatText(lesson.isiMateri.penjelasan)}

                        <div class="tip-card">
                            <div class="tip-card-title">
                                <i data-lucide="lightbulb" style="width:16px; height:16px;"></i>
                                Tips dari Kira
                            </div>
                            <p>${lesson.isiMateri.tipsDariKira}</p>
                        </div>

                        <div class="summary-card">
                            <div class="summary-card-title">Ringkasan</div>
                            <p>${lesson.ringkasan}</p>
                        </div>

                        <ul class="checklist-list">
                            ${lesson.checklist.map(item => `
                                <li class="checklist-item">
                                    <div class="checklist-box ${isCompleted ? 'checked' : ''}">
                                        ${isCompleted ? '<i data-lucide="check" style="width:12px;height:12px;color:white;"></i>' : ''}
                                    </div>
                                    <span>${item}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>

                    <div class="card" style="margin-top:var(--space-md); display:flex; align-items:center; gap:var(--space-md);">
                        <input type="checkbox" id="checkUnderstand" class="choice-input" ${isCompleted ? 'checked' : ''}>
                        <label for="checkUnderstand" class="choice-label" style="flex:1;">Saya sudah memahami materi</label>
                    </div>

                    <div class="course-nav">
                        <button class="btn btn-primary" style="width:auto; max-width:200px;" id="btnPrev" ${!lesson.tombolSebelumnya ? 'disabled' : ''}>
                            <i data-lucide="chevron-left" style="width:18px;height:18px;"></i> ${lesson.tombolSebelumnya || 'Sebelumnya'}
                        </button>
                        <button class="btn btn-primary" style="width:auto; max-width:200px;" id="btnNext" ${!lesson.tombolBerikutnya ? 'disabled' : ''}>
                            ${lesson.tombolBerikutnya || 'Berikutnya'} <i data-lucide="chevron-right" style="width:18px;height:18px;"></i>
                        </button>
                    </div>

                    ${Footer()}
                </section>
            </div>
        `;
        
        this.bindLessonEvents();
        if(window.lucide) window.lucide.createIcons();
    },

    bindLessonEvents() {
        document.getElementById('btnBack')?.addEventListener('click', () => Router.navigate('/beranda'));
        
        document.getElementById('checkUnderstand')?.addEventListener('change', (e) => {
            const lesson = facebookCourseData[this.currentLessonIndex];
            Store.update(`progress.${lesson.id}`, e.target.checked);
            this.renderLesson(); 
        });

        document.getElementById('btnPrev')?.addEventListener('click', () => {
            if(this.currentLessonIndex > 0) { this.currentLessonIndex--; this.renderLesson(); window.scrollTo(0,0); }
        });

        document.getElementById('btnNext')?.addEventListener('click', () => {
            if(this.currentLessonIndex < facebookCourseData.length - 1) { this.currentLessonIndex++; this.renderLesson(); window.scrollTo(0,0); }
        });

        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.addEventListener('click', () => {
                this.currentLessonIndex = parseInt(item.getAttribute('data-index'));
                this.renderLesson();
                window.scrollTo(0,0);
            });
        });
    },

    init() {
        this.renderLesson();
    }
};