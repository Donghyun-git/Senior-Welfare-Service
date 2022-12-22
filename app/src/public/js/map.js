//receive data
var newData = [];
let mapArea = document.getElementById("map");
let mapTitle = document.querySelector(".map_tit");
let loadingBar = document.querySelector(".box");
let markers = new Array();
let infoWindows = new Array();

async function getData() {
    const res = await fetch('json/Welfare.json');
    const data = await res.json();
    console.log(data);
    
    for(let i=0; i<data.length; i++){
      naver.maps.Service.fromAddrToCoord({ address: `${data[i].address}` }, function(status, response) {
    if (status === naver.maps.Service.Status.ERROR) {
    return console.log('Something wrong!');
    }
    let lat = response.result.items[0].point.y;
    let lng = response.result.items[0].point.x;
    newData.push({
        name: data[i].name,
        tel: data[i].tel,
        adr: data[i].address,
        lat: lat,
        lng: lng
    });
    }   
    )  
}
    
};
getData();

setTimeout(() => {
    console.log(newData);
    var map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(36.815129, 127.1138939),
        zoom: 18
        });
    for(var i=0; i<newData.length; i++){
        var marker = new naver.maps.Marker({
                map: map,
                position: new naver.maps.LatLng(newData[i].lat, newData[i].lng),
                });
        
        var infoWindow = new naver.maps.InfoWindow({
            content: '<div class="marker_info">'+'<i class="fa fa-hospital-o" aria-hidden="true"></i>&nbsp <b>' + newData[i].name + '</b><br><h6>' + newData[i].tel +
            '</h6><br>'+ '<b>'+"주소: "+ '</b>' + newData[i].adr + '</div>',
            borderWidth: 0,
            disableAnchor: true,
            backgroundColor: 'transparent',
        });
        
            markers.push(marker);
            infoWindows.push(infoWindow);
    }
    mapTitle.style.display = "inline-block";
    loadingBar.style.display = "none";


        function getClickHandler(seq) {
    
        return function(e) {  
            var marker = markers[seq], 
                infoWindow = infoWindows[seq]; 
    
            if (infoWindow.getMap()) {
                infoWindow.close();
            } else {
                infoWindow.open(map, marker); 
            }
        }
        }
    
        for (var i=0, j=markers.length; i<j; i++) {
        naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i)); 
        }
}, 17000);


