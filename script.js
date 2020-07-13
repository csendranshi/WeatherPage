window.addEventListener('load', ()=>{
   let long;
    let lat;
//    let city;
    let tempDesc =document.querySelector('.temperature-description');
    let tempDegree =document.querySelector('.temperature-degree');
    let temptimezone =document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const tempSpan = document.querySelector('.temperature span');
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long =position.coords.longitude;
            lat= position.coords.latitude;
//            city=position.coords.
//            console.log(long,lat);
            const proxy ='https://cors-anywhere.herokuapp.com/';
            const api =`${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=[api-Token]`;
            fetch(api)
                .then(response => {
//                console.log(response.jsonp)
                    return response.json();
                })
                .then(data => {
                        console.log(data);
                        const {temp}=data.main;
                     tempDegree.textContent = Math.floor(temp-273);
                     tempDesc.textContent=data.weather[0].description.toUpperCase();
                temptimezone.textContent=data.name.toUpperCase();
                
//                formula for conversion
                let celsius = temp-273;
                let faren = (temp - 273.15) * (9/5) +32;
                
//                set icons
                setIcons(data.weather[0].main,document.querySelector(".icon"));
                
//                change temperature to F
                temperatureSection.addEventListener('click',()=>{
                    if(tempSpan.textContent==="C"){
                        tempSpan.textContent="F";
                        tempDegree.textContent=faren;
                    }
                    else{
                        tempSpan.textContent="C";
                        tempDegree.textContent=Math.floor(celsius);
                    }
                })
//                (temp − 273.15) × 9/5 + 32;
                    });
            
        });
        
        
        
    }
    
    function setIcons(icon,iconID){
        var skycons = new Skycons ({"color":"white"});
        var currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID,skycons[currentIcon]);
    
    }
//    else{
//        h1.textContent="Do check your boundaries and Refresh";
//    }
});