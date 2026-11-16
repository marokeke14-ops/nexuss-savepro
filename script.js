document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadVideo);
    }
});

async function downloadVideo() {
    const urlInput = document.getElementById('urlInput').value.trim();
    const statusText = document.getElementById('statusText');
    const resultArea = document.getElementById('resultArea');
    const downloadBtn = document.getElementById('downloadBtn');

    if (!urlInput) {
        alert('Silakan masukkan tautan TikTok terlebih dahulu!');
        return;
    }

    statusText.classList.remove('hidden');
    resultArea.classList.add('hidden');
    downloadBtn.disabled = true;

    try {
        const apiURL = `https://www.tikwm.com/api/?url=${encodeURIComponent(urlInput)}`;
        const response = await fetch(apiURL);
        const data = await response.json();

        if (data.code === 0) {
            const videoData = data.data;

            // Masukkan judul & thumbnail
            document.getElementById('videoTitle').innerText = videoData.title || "Video TikTok";
            document.getElementById('videoThumb').src = videoData.cover;
            
            // Masukkan link ke masing-masing tombol resolusi
            document.getElementById('downloadHD').href = videoData.hdplay || videoData.play; // Prioritas HD, fallback ke play biasa
            document.getElementById('downloadWatermark').href = videoData.wmplay; // Video dengan watermark bawaan TikTok
            document.getElementById('downloadAudio').href = videoData.music; // Musik MP3

            statusText.classList.add('hidden');
            resultArea.classList.remove('hidden');
        } else {
            alert('Gagal mengambil data video. Pastikan tautan TikTok valid!');
            statusText.classList.add('hidden');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan koneksi ke server.');
        statusText.classList.add('hidden');
    } finally {
        downloadBtn.disabled = false;
    }
}
