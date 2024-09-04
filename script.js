const wrapper = document.querySelector(".wrapper"), /*wrapperi yani ana divi çektik.Bu kısımda dom işlemleri , Bir HTML belgesindeki ilk eşleşen öğeyi (elementi) seçmek için kullanılır. Bu yöntem, CSS seçicilerini kullanarak öğeleri seçmenizi sağlar ve ilk eşleşen öğeyi döner. */
inputPart = wrapper.querySelector(".input-part"), /* Burada inputPart ı wrapper'ın içinden çektim  */
infoTxt = inputPart.querySelector(".info-txt"), /* infoTxt yi inputParttan çektim*/
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button")
let api;

inputField.addEventListener("keyup", e => {  /* eneter a basıldığında bir sonraki aşamaya geçer. Burada bir e fonksiyonu yaptım  */
    if(e.key == "Enter" && inputField.value != ""){  /*eğer klavyede enter tuşuna basıldıysa ve giriş alanındaki değer boş bir değer değilse requestApi fonksiyonunu dönecek*/
        requestApi(inputField.value) /* entera basılıp doğru bilgi girildikten sonra requestApi fonksiyonuna inputField.value değerini gönderince requestApi istenilen şehri getiricek.   */
    }
})

/*Konumu belirle butonuna tıkladığımız anda enlem ve boylam bilgilerini apiye iletilecek, sonrada apiye göre o enlem ve boylamdaki konumda bulunan adresin hava durumunu iletmiş olacak. */

locationBtn.addEventListener("click" , ()=>{
    if(navigator.geolocation){ /*(Eğer tarayıcı geolocation a izin veriyorsa) web tarayıcısının cihazın coğrafi konumunu (enlem ve boylam) elde etmesini sağlayan bir özellik*/
        navigator.geolocation.getCurrentPosition(onSuccess , onError) /*anlık konum alıyor */
    }else{
        console.log("Tarayıcınız geolocation'ı desteklemiyor...")
    }
})

function onSuccess(position){ /*Bilgiler Doğruysa */
    const {latitude, longitude} = position.coords;/*apinin içine atacağımız bilgiyi çekiyoruz. Cihazdan koordinat bilgilerini çektik.*/
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c827e509ebbf1aced58ca226843c8c5e`  /*Çektiğimiz bilgileri apiye gönderdik. Latitude ve longitude bilgilerini dinamik olarak aldık. */
    fetchData()
}

function onError(error){ /*Hata durumunda */
    infoTxt.innerText = error.message /*Konumu belirle dediğimiz zaman konum açık değilken konsolda çıkan mesaj metninin içerisindeki bilgiyi alır.*/
    infoTxt.classList.add("error")
}

function requestApi(city){ /* Bu fonksiyon ile konsola şehir ismi dönüyor. */
   api =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c827e509ebbf1aced58ca226843c8c5e`; /*Burda openweather dan alacağımız bilgileri api ile bağladım.Burda city name i js nin içinden dinamik olarak çekicem.Bunu ${city} ile yaptım.apikey i de ekledim*/
   fetchData()
}

function fetchData(){
    infoTxt.innerText = "Sonuçlar Yükleniyor..."
    infoTxt.classList.add("pending")
    fetch(api).then(response => response.json()).then(result => weatherDetails(result))  /* Öncelikle apiden bir response aldım, bunu bir js objesine döndürdüm, daha sonra da weatherDetails() fonksiyonunu çağırdım. api sonuçlarını bir argüman olarak alıp ekranda yazdırıcaz. */
}

function weatherDetails(info){
    console.log(info)
}

