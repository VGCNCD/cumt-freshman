 // ===== 导航栏滚动效果 =====
 const header = document.getElementById('header');
 let lastScroll = 0;
 
 window.addEventListener('scroll', () => {
     const scrollY = window.scrollY;
     if (scrollY > 80) {
         header.classList.add('scrolled');
     } else {
         header.classList.remove('scrolled');
     }
     lastScroll = scrollY;
 });
 
 // ===== 移动端菜单 =====
 const menuToggle = document.getElementById('menuToggle');
 const nav = document.getElementById('nav');
 
 menuToggle.addEventListener('click', () => {
     menuToggle.classList.toggle('active');
     nav.classList.toggle('open');
 });
 
 // 点击导航链接后关闭菜单
 document.querySelectorAll('.nav-link').forEach(link => {
     link.addEventListener('click', () => {
         menuToggle.classList.remove('active');
         nav.classList.remove('open');
     });
 });
 
 // ===== 复制 QQ 群号 =====
 function copyQQNumber() {
     const qqNumber = document.getElementById('qqNumber').textContent.trim();
     const toast = document.getElementById('toast');
 
     if (navigator.clipboard && navigator.clipboard.writeText) {
         navigator.clipboard.writeText(qqNumber).then(() => {
             showToast(toast);
         }).catch(() => {
             fallbackCopy(qqNumber, toast);
         });
     } else {
         fallbackCopy(qqNumber, toast);
     }
 }
 
 function fallbackCopy(text, toast) {
     const textarea = document.createElement('textarea');
     textarea.value = text;
     textarea.style.position = 'fixed';
     textarea.style.opacity = '0';
     document.body.appendChild(textarea);
     textarea.select();
     document.execCommand('copy');
     document.body.removeChild(textarea);
     showToast(toast);
 }
 
 function showToast(toast) {
     toast.classList.add('show');
     setTimeout(() => {
         toast.classList.remove('show');
     }, 2000);
 }
 
 // ===== 滚动高亮当前导航 =====
 const sections = document.querySelectorAll('section[id]');
 const navLinks = document.querySelectorAll('.nav-link');
 
 function highlightNav() {
     let current = '';
     sections.forEach(section => {
         const sectionTop = section.offsetTop - 200;
         const sectionHeight = section.offsetHeight;
         if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
             current = section.getAttribute('id');
         }
     });
 
     navLinks.forEach(link => {
         link.classList.remove('active');
         if (link.getAttribute('href') === '#' + current) {
             link.classList.add('active');
         }
     });
 }
 
 window.addEventListener('scroll', highlightNav);
 
 // ===== 入场动画 =====
 const observerOptions = {
     threshold: 0.15,
     rootMargin: '0px 0px -40px 0px'
 };
 
 const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             entry.target.classList.add('visible');
             observer.unobserve(entry.target);
         }
     });
 }, observerOptions);
 
 document.addEventListener('DOMContentLoaded', () => {
     // 给卡片和区块添加动画类
     const animateElements = document.querySelectorAll(
         '.overview-card, .life-card, .guide-item, .transport-card, .contact-qq-card, .contact-item'
     );
     animateElements.forEach(el => {
         el.classList.add('fade-in');
         observer.observe(el);
     });
 });
