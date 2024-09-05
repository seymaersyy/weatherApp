const wrapper = document.querySelector(".wrapper"), /*wrapperi yani ana divi çektik.Bu kısımda dom işlemleri , Bir HTML belgesindeki ilk eşleşen öğeyi (elementi) seçmek için kullanılır. Bu yöntem, CSS seçicilerini kullanarak öğeleri seçmenizi sağlar ve ilk eşleşen öğeyi döner. */
inputPart = wrapper.querySelector(".input-part"), /* Burada inputPart ı wrapper'ın içinden çektim  */
infoTxt = inputPart.querySelector(".info-txt"), /* infoTxt yi inputParttan çektim*/
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button")
wIcon = document.querySelector(".weather-part img")
arrowBack = document.querySelector("header i ")
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
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=c827e509ebbf1aced58ca226843c8c5e`  /*Çektiğimiz bilgileri apiye gönderdik. Latitude ve longitude bilgilerini dinamik olarak aldık. */
    fetchData()
}

function onError(error){ /*Hata durumunda */
    infoTxt.innerText = error.message /*Konumu belirle dediğimiz zaman konum açık değilken konsolda çıkan mesaj metninin içerisindeki bilgiyi alır.*/
    infoTxt.classList.add("error")
}

function requestApi(city){ /* Bu fonksiyon ile konsola şehir ismi dönüyor. */
   api =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c827e509ebbf1aced58ca226843c8c5e`; /*Burda openweather dan alacağımız bilgileri api ile bağladım.Burda city name i js nin içinden dinamik olarak çekicem.Bunu ${city} ile yaptım.apikey i de ekledim*/
   fetchData()
}

function fetchData(){
    infoTxt.innerText = "Sonuçlar Yükleniyor..."
    infoTxt.classList.add("pending")
    fetch(api).then(response => response.json()).then(result => weatherDetails(result))  /* Öncelikle apiden bir response aldım, bunu bir js objesine döndürdüm, daha sonra da weatherDetails() fonksiyonunu çağırdım. api sonuçlarını bir argüman olarak alıp ekranda yazdırıcaz. */
}

function weatherDetails(info){
    if(info.cod == "404"){
        infoTxt.classList.replace("pending","error")
        infoTxt.innerText = `${inputField.value} şehri bulunamadı !`
    }else{
        /*weatherDetails kısmını apiye bağlayıp, hava durumu bilgilerini apiden çekicez. Apinin istediği bazı bilgiler: */
        /*consoledaki bilgilerin olduğu yere göre alıyoruz örn info.name name de şehir ismi yazılıydı */
        const city = info.name
        const country = info.sys.country
        const {description, id} = info.weather[0]
        const {feels_like , humidity ,temp} = info.main 

        if(id == 800){
            wIcon.src = "icons/clear.svg"
        }else if(id => 200 && id <= 232){
            wIcon.src = "icons/storm.svg"
        }else if(id => 600 && id <= 622){
            wIcon.src = "icons/snow.svg"
        }else if(id => 801 && id <= 804){
            wIcon.src = "icons/cloud.svg"
        }else if(id => 701 && id <= 781){
            wIcon.src = "icons/haze.svg"
        }else if((id =>300 && id <=321) || (id => 500 && id <= 531)){
            wIcon.src = "icons/rain.svg"
        }

        wrapper.querySelector(".temp .number").innerText = Math.round(temp) /*wrapperın altındaki tempin altındaki number a temp i atıyoruz.  */
        wrapper.querySelector(".weather").innerText = description
        wrapper.querySelector(".location").innerText = `${city}, ${country}`
        wrapper.querySelector(".temp .number-2").innerText = Math.round(feels_like)
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`
        
        infoTxt.classList.remove("pending", "error")
        wrapper.classList.add("active")
    }
    
}

arrowBack.addEventListener("click" , () => {
    wrapper.classList.remove("active")
    document.getElementById('myInput').value = '';
})


