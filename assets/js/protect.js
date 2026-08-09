// 基礎防護：降低隨手複製/下載圖片與原始碼的便利性（無法做到 100% 防護，僅提高門檻）
document.addEventListener('contextmenu', function(e){
  if (e.target.tagName === 'IMG') e.preventDefault();
});
document.addEventListener('dragstart', function(e){
  if (e.target.tagName === 'IMG') e.preventDefault();
});
document.addEventListener('keydown', function(e){
  var k = e.key;
  var blocked =
    k === 'F12' ||
    (e.ctrlKey && e.shiftKey && (k === 'I' || k === 'J' || k === 'C' || k === 'i' || k === 'j' || k === 'c')) ||
    (e.ctrlKey && (k === 'u' || k === 'U' || k === 's' || k === 'S'));
  if (blocked) e.preventDefault();
});
