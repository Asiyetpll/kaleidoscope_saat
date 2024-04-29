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

            // Yeni bir div oluştur
            var newDiv = document.createElement("div");
            newDiv.className = "col"; // Class adını ekleyin

            // İçeriğini ayarla
            newDiv.innerHTML = `
                <div class="card shadow-sm">
                    <img src="${imgUrl}" class="bd-placeholder-img card-img-top" width="100%" height="225" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false" data-image="${imgUrl}">
                    <div class="card-body">
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                            </div>
                            <small class="text-body-secondary">9 mins</small>
                        </div>
                    </div>
                </div>
            `;
            // Yeni div'i ilgili yere ekle
            document.getElementById("targetDiv").appendChild(newDiv);
        };

        reader.readAsDataURL(file);
    }
});

document.getElementById('targetDiv').addEventListener('click', function (event) {
    const target = event.target;
    if (target.tagName === 'IMG') {
        // Tıklanabilir resimlere click event'i ekle
        const allImages = document.querySelectorAll('.image-preview img');
        allImages.forEach(img => {
            img.addEventListener('click', function () {
                const imageURL = this.getAttribute('data-image');
                const tiles = document.querySelectorAll('.tile');
                tiles.forEach(tile => {
                    const textureDiv = tile.querySelector('.texture');
                    textureDiv.style.backgroundImage = `url(${imageURL})`;
                });
            });
        });
        const imageURL = target.getAttribute('src');
        document.querySelector('.texture').style.backgroundImage = `url(${imageURL})`;
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

