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

// Saat öğesini seç
var myWatch = document.querySelector('.mywatch');
// Additional-content bölümünü seç
var additionalContent = document.querySelector('.additional-content');

// Saat öğesine tıklanınca görünürlüğü değiştir
myWatch.addEventListener('click', function () {
    // Eğer additional-content görünürse, gizle; değilse görünür yap
    if (additionalContent.style.display === 'block') {
        additionalContent.style.display = 'none';
    } else {
        additionalContent.style.display = 'block';
    }
});

// Sayfa yüklendiğinde JavaScript çalıştır
window.onload = function () {
    // Düzenleme butonunu seç
    var duzenleButton = document.getElementById("dzn-btn");

    // Düzenleme butonuna tıklanınca
    duzenleButton.onclick = function () {
        // Belirli alanları açıp/kapat
        toggleSections();
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

// Kaydet düğmesine tıklandığında modalı kapat
document.getElementById("saveImage").addEventListener("click", function () {
    var modal = document.getElementById("exampleModal");
    var modalBackdrop = document.querySelector(".modal-backdrop");
    modal.classList.remove("show");
    modalBackdrop.remove();
});

// Kadran alanını açıp/kapat
function toggleKadranAlani() {
    var kadranAlani = document.getElementById("kadran-alani");
    kadranAlani.classList.toggle("hidden");
}

// Resimler alanını açıp/kapat
function toggleResimler() {
    var resimlerAlani = document.getElementById("resimler");
    resimlerAlani.classList.toggle("hidden");
}

// Modal'ı gizle
document.getElementById("exampleModal").classList.remove("show");


// Düzenle düğmesine tıklandığında mor çerçevenin rengini değiştir
document.getElementById("dzn-btn").addEventListener("click", function () {
    var morCerceve = document.querySelector(".mor_cerceve");
    morCerceve.classList.toggle("renk-degistir");
});

document.addEventListener("DOMContentLoaded", function () {
    // .mywatch alanını al
    var myWatch = document.querySelector(".mywatch");

    // Kadran rengi değiştiğinde çalışacak fonksiyon
    document.querySelector(".kadran-rengi input[type='color']").addEventListener("input", function () {
        myWatch.querySelector(".kadran-rengi").style.backgroundColor = this.value;
    });

    // Saat içi arka plan rengi değiştiğinde çalışacak fonksiyon
    document.querySelector(".ic-arka-plan input[type='color']").addEventListener("input", function () {
        myWatch.querySelector(".clock-settings").style.backgroundColor = this.value;
    });

    // Saat arka plan rengi değiştiğinde çalışacak fonksiyon
    document.querySelector(".dis-arka-plan input[type='color']").addEventListener("input", function () {
        myWatch.querySelector(".kadran-alani").style.backgroundColor = this.value;
    });

    // Arka plan kalınlığı değiştiğinde çalışacak fonksiyon
    document.querySelector(".arka-plan-kalinlik input[type='range']").addEventListener("input", function () {
        myWatch.style.borderWidth = this.value + 'px';
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
            var newImage = '<div class="col-2"><img src="' + e.target.result + '" class="small-image" alt="Resim"></div>';

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

