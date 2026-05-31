const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzkxS8uL3z5iLUzl2dSle8TZ1UavGprz5TLoTgzCUkHzJmvdCl39IN7FB9WXS5V9sk/exec';

export async function sendResultToSheet(data) {

  const syncStatus = document.getElementById('sync-status');

  try {

    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Sync failed');
    }

    syncStatus.innerText =
      '✅ Kết quả đã được lưu vào hệ thống.';

  } catch (error) {

    syncStatus.innerText =
      '⚠️ Không thể đồng bộ dữ liệu lúc này. Vui lòng chụp màn hình kết quả.';

    console.error(error);
  }
}
