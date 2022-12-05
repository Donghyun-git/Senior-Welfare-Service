//receive data

var newData = [];

async function getData() {
    const res = await fetch('json/Welfare.json');
    const data = await res.json();
    console.log(data);
    
    let markers = new Array();
    let infoWindows = new Array();
    
    for(let i=0; i<data.length; i++){
      naver.maps.Service.fromAddrToCoord({ address: `${data[i].address}` }, function(status, response) {
    if (status === naver.maps.Service.Status.ERROR) {
    return alert('Something wrong!');
    }
    let lat = response.result.items[0].point.y;
    let lng = response.result.items[0].point.x;
    newData.push({
        name: data[i].name,
        tel: data[i].tel,
        lat: lat,
        lng: lng
    });
    }   
    )  
}
    // var infoWindow = new naver.maps.InfoWindow({
    // content: '<div style="width: 250px; text-align: center; padding:10px;"><b style="font-weight: 300; font-size: 18px;">' + '${json1[i].info.pname} '+ '${json1[i].info.page} '+ '${json1[i].info.sex}' + '<p style="font-size: 16px; font-weight: 400;">' + '${json1[i].info.padr}' + '</p>' + '</b></div>'
    // });

    // markers.push(marker);
    // infoWindows.push(infoWindow);

    // function getClickHandler(seq) {

    // return function(e) {  // 마커를 클릭하는 부분
    //     var marker = markers[seq], // 클릭한 마커의 시퀀스로 찾는다.
    //         infoWindow = infoWindows[seq]; // 클릭한 마커의 시퀀스로 찾는다

    //     if (infoWindow.getMap()) {
    //         infoWindow.close();
    //     } else {
    //         infoWindow.open(map, marker); // 표출
    //     }
    // }
    // }

    // for (var i=0, j=markers.length; i<j; i++) {
    // naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i)); // 클릭한 마커 핸들러
    // }
    
};
getData();

setTimeout(() => {
    console.log(newData);
    var map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(36.815129, 127.1138939),
        zoom: 10
        });
    for(var i=0; i<newData.length; i++){
        var marker = new naver.maps.Marker({
                map: map,
                position: new naver.maps.LatLng(newData[i].lat, newData[i].lng),
                });
    }
}, 17000);

setTimeout(() => {
    
}, )

