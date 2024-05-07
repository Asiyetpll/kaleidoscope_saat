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

// Sayfa yüklendiğinde JavaScript çalıştır
window.onload = function() {
    // Düzenleme butonunu seç
    var duzenleButton = document.getElementById("dzn-btn");

    // Düzenleme butonuna tıklanınca
    duzenleButton.onclick = function() {
        // Belirli alanları açıp/kapat
        toggleSections();
    };

    // Resim ekleme butonunu seç
    var resimEkleButton = document.getElementById("addImageButton");

    // Resim ekleme butonuna tıklanınca
    resimEkleButton.onclick = function() {
        // Resim ekleme modalını göster
        toggleModal();
    };
};

// Belirli alanları açıp/kapat
function toggleSections() {
    // Kadran alanını aç/kapat
    var kadranAlani = document.querySelector(".kadran-alani");
    toggleDisplay(kadranAlani);

    // Resimler alanını aç/kapat
    var resimlerAlani = document.getElementById("resimler");
    toggleDisplay(resimlerAlani);
}

// Bir HTML öğesinin görünürlüğünü değiştirir
function toggleDisplay(element) {
    if (element.style.display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

// Resim ekleme modalını açıp/kapat
function toggleModal() {
    var modal = document.getElementById("exampleModal");
    var modalBackdrop = document.querySelector(".modal-backdrop");
    
    if (modal.classList.contains("show")) {
        modal.classList.remove("show");
        modalBackdrop.remove();
    } else {
        modal.classList.add("show");
        document.body.appendChild(modalBackdrop);
    }
}

// Kadran alanını açıp/kapat
function toggleKadranAlani() {
    var kadranAlani = document.getElementById("kadran-alani");
    kadranAlani.classList.toggle("hidden");
}

// Kadran ayarlarını al
const thicknessInput = document.getElementById('thickness');
const colorInput = document.getElementById('color');

// Kadran ayarlarının değişimini dinle
thicknessInput.addEventListener('input', updateClockStyle);
colorInput.addEventListener('input', updateClockStyle);

document.addEventListener("DOMContentLoaded", function () {
    const backgroundColorPicker = document.getElementById("background-color");
    const screen = document.querySelector(".screen");

    backgroundColorPicker.addEventListener("input", function () {
        const selectedColor = this.value;
        screen.style.backgroundColor = selectedColor;
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const watchBackgroundColorPicker = document.getElementById("watch-background-color");
    const myWatch = document.querySelector(".mywatch");

    watchBackgroundColorPicker.addEventListener("input", function () {
        const selectedColor = this.value;
        myWatch.style.backgroundColor = selectedColor;
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Resimlerin bulunduğu img etiketlerini seç
    var images = document.querySelectorAll(".image-box img");

    // Her bir resim için click event listener ekle
    images.forEach(function (image, index) {
        image.addEventListener("click", function () {
            // Saat arka planı için gerekli dosya yolu
            var backgroundImagePath = "kaleidoscope_saat/resimler/manzara" + (index + 1) + ".jpg";

            // Saatin texture sınıfındaki background-image özelliğini güncelle
            var textures = document.querySelectorAll(".texture");
            textures.forEach(function (texture) {
                texture.style.backgroundImage = "url('" + backgroundImagePath + "')";
            });
        });
    });
});

// Resim ekleme butonuna tıklandığında
document.getElementById('saveImage').addEventListener('click', function () {
    // Resim yükleme input elementini al
    var input = document.getElementById('imageUpload');

    // Eğer resim seçilmişse devam et
    if (input.files && input.files[0]) {
        // Dosya okuma işlemi için FileReader kullan
        var reader = new FileReader();

        reader.onload = function (e) {
            // Yüklenecek resmin HTML kodunu oluştur
            var newImage = '<div class="col-2"><img src="' + e.target.result + '" class="img-fluid" alt="Resim"></div>';

            // Resimleri ekleyeceğimiz div elementini al
            var imageRow = document.getElementById('imageRow');

            // Yeni resmi ekle
            imageRow.innerHTML += newImage;

            // Eğer altıncı sıradaki eleman varsa resim ekle butonunu sakla
            if (imageRow.children.length >= 6) {
                document.getElementById('addImageButton').style.display = 'none';
            }
        };

        // Resmi oku ve yükle
        reader.readAsDataURL(input.files[0]);
    }
});

