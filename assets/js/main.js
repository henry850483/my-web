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

  // 服務項目篩選按鈕（含從導覽下拉選單 #cat-xxx 連結過來的自動篩選/定位）
  var filterRow = document.getElementById('filterRow');
  var caseGrid = document.getElementById('caseGrid');
  var resultCount = document.getElementById('resultCount');
  if (filterRow && caseGrid) {
    var filterBtns = filterRow.querySelectorAll('.filter-btn');
    var caseItems = caseGrid.querySelectorAll('.case-item');

    function applyFilter(filter) {
      var count = 0;
      caseItems.forEach(function (item) {
        var match = filter === 'all' || item.getAttribute('data-cat') === filter;
        item.classList.toggle('show', match);
        item.style.display = match ? '' : 'none';
        if (match) count++;
      });
      if (resultCount) {
        var unit = resultCount.getAttribute('data-unit') || '張作品';
        resultCount.textContent = '共 ' + count + ' ' + unit;
      }
      filterBtns.forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-filter') === filter);
      });
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        applyFilter(btn.getAttribute('data-filter'));
        history.replaceState(null, '', '#' + btn.id);
      });
    });

    function filterFromHash() {
      var hash = window.location.hash.replace('#', '');
      var target = document.getElementById(hash);
      if (target && target.classList.contains('filter-btn')) {
        applyFilter(target.getAttribute('data-filter'));
        setTimeout(function () {
          var y = target.getBoundingClientRect().top + window.pageYOffset - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 50);
      }
    }
    filterFromHash();
    window.addEventListener('hashchange', filterFromHash);
  }
});
