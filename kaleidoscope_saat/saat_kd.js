function updateClock() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    const hourHand = document.getElementById('hour-hand');
    const minuteHand = document.getElementById('minute-hand');
    const secondHand = document.getElementById('second-hand');

    const hourDeg = (hour % 12) * 30 + (minute / 60) * 30;
    const minuteDeg = minute * 6;
    const secondDeg = second * 6;

    hourHand.style.transform = `rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `rotate(${secondDeg}deg)`;

}

updateClock();
setInterval(updateClock, 1000);

// Resim ekle butonunu seç
const addImageButton = document.getElementById('addImageButton');
// Resim gösterme alanını seç
const imagePreview = document.querySelector('.image-preview');
// Resim ekle butonuna tıklandığında resim yükleme alanını göster
addImageButton.addEventListener('click', function () {
    document.getElementById('imageInput').click();
});

// Resim seçildiğinde önizleme göster
document.getElementById('imageInput').addEventListener('change', function () {
    const file = this.files[0];

    if (file && file.type.startsWith('image')) {
        const reader = new FileReader();

        reader.onload = function () {
            const imgUrl = reader.result;

            // Resmi önizleme alanına ekle
            const imgElement = document.createElement('img');
            imgElement.src = imgUrl;
            imgElement.style.cursor = 'pointer'; // Resme tıklanabilir olması için imleci el işaretine çevir
            imgElement.style.width = '150%';
            imgElement.style.height = '150%';
            imgElement.style.marginLeft = '750px';
            imagePreview.innerHTML = ''; // Önceki resmi temizle
            imagePreview.appendChild(imgElement);

            // Resme tıklandığında saat ekranındaki texture'ların arka plan resmini güncelle
            imgElement.addEventListener('click', function () {
                // Seçilen resmin URL'sini al
                const selectedImageUrl = imgElement.src;

                // Saat ekranındaki texture'ların arka plan resmini güncelle
                const textures = document.querySelectorAll('.texture');
                textures.forEach(texture => {
                    texture.style.backgroundImage = `url(${selectedImageUrl})`;
                });
            });

        };

        reader.readAsDataURL(file);
    }
});


// Kadran ayarlarını al
const thicknessInput = document.getElementById('thickness');
const colorInput = document.getElementById('color');

// Kadran ayarlarının değişimini dinle
thicknessInput.addEventListener('input', updateClockStyle);
colorInput.addEventListener('input', updateClockStyle);

// Saat kadranı stilini güncelle
function updateClockStyle() {
    // Kalınlık değerini al ve CSS değişkenine ata
    document.documentElement.style.setProperty('--hand-thickness', thicknessInput.value + 'px');
    // Renk değerini al ve CSS değişkenine ata
    document.documentElement.style.setProperty('--hand-color', colorInput.value);
}
