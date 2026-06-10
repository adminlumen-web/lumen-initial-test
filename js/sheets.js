const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwcK9_ah2qtonqY0dvc5OF97lmHLTxBQUms9U1gVOzWTpbGssyuhBmfjUetYnmySXs/exec';

export async function sendResultToSheet(data) {

  const syncStatus = document.getElementById('sync-status');

  if (!syncStatus) {
    console.warn('Element #sync-status not found.');
    return;
  }

  try {

    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      }
    });

    let result;

    try {
      result = await response.json();
    } catch {
      result = null;
    }

    if (!response.ok || !result?.success) {
      throw new Error(result?.error || 'Sync failed');
    }

    syncStatus.textContent = '✅ Kết quả đã được lưu vào hệ thống.';

  } catch (error) {

    syncStatus.textContent =
      '⚠️ Không thể đồng bộ dữ liệu lúc này. Vui lòng chụp màn hình kết quả.';

    console.error('Sheet sync error:', error);
  }
}
