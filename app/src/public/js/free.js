/* free.json 로컬 데이터 */

// fetch('../json/freefood.json')
//     .then((data) => {
//         if(data){
//             let freeJson = data.json();
//             console.log(freeJson);
//             return freeJson;
//         } 
// });
let freeInfo = new Array();

const getData = async () => {

    const response = await fetch('../json/freefood.json');
    const data = await response.json();
    console.log(data);
    
    data.map((e) => {
        freeInfo.push({
            name: e.name,
            address: e.roadAdr,
            tel: e.tel,
            who: e.who,
            day: e.day,
            foodtime: e.foodtime,
        });
    })
}
getData();

console.log(freeInfo);


