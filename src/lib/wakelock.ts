export async function initWakelock() {
  let wakeLock: any = null;

  const requestWakeLock = async () => {
    try {
      if (!('wakeLock' in navigator)) {
        return;
      }
      wakeLock = await (navigator.wakeLock as any).request('screen');
    } catch (err) {
      //
    }
  };

  await requestWakeLock();
  setTimeout(() => {
    wakeLock.release();
    wakeLock = null;
  }, 5000);

  const handleVisibilityChange = async () => {
    if (wakeLock !== null && document.visibilityState === 'visible') {
      await requestWakeLock();
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
}
