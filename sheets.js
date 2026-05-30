const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';

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
