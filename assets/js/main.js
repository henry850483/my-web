// 長源廣告官網 - 共用互動邏輯
document.addEventListener('DOMContentLoaded', function () {
  // 手機版選單開關
  var toggle = document.querySelector('.menu-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('mobile-open');
      toggle.classList.toggle('open', isOpen);
    });
  }

  // FAQ 手風琴
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('open');
        i.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // 下拉選單延遲關閉（滑鼠移動到子選單途中不會瞬間關閉）
  function setupHoverMenu(selector, showClass, delay) {
    document.querySelectorAll(selector).forEach(function (el) {
      var timer = null;
      el.addEventListener('mouseenter', function () {
        clearTimeout(timer);
        el.classList.add(showClass);
      });
      el.addEventListener('mouseleave', function () {
        timer = setTimeout(function () {
          el.classList.remove(showClass);
        }, delay);
      });
    });
  }
  setupHoverMenu('.nav-item', 'show-dropdown', 350);
  setupHoverMenu('.dropdown-item.has-children', 'show-flyout', 350);

  // 照片點擊放大燈箱
  var lightboxImgs = document.querySelectorAll('.photo-visual-img img, .lightbox-trigger');
  if (lightboxImgs.length) {
    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = '<button class="lightbox-close" aria-label="關閉">&times;</button><img class="lightbox-img" src="" alt="">';
    document.body.appendChild(overlay);
    var lightboxImg = overlay.querySelector('.lightbox-img');

    lightboxImgs.forEach(function (img) {
      img.addEventListener('click', function () {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
    overlay.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }
});
