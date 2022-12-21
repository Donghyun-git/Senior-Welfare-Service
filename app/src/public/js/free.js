/* free.json 로컬 데이터 */

// fetch('../json/freefood.json')
//     .then((data) => {
//         if(data){
//             let freeJson = data.json();
//             console.log(freeJson);
//             return freeJson;
//         } 
// });
let freeHtml = '';
let allData = [];
const getData = async () => {

    const response = await fetch('../json/freefood.json');
    const data = await response.json();
    console.log(data);
    

    let freeInfo = data.map((data) => {
        return data;
    });
    
    for(let i=0; i<freeInfo.length; i++){
         freeHtml += `
        <li>
            <a href="#">
                <dl class="name">
                    <dt>${freeInfo[i].name}</dt>
                    <dd>
                        ${freeInfo[i].tel} <br>
                        ${freeInfo[i].foodtime} <br>
                        ${freeInfo[i].day} 
                    </dd>
                </dl>
                <a href="/popup${i}">
                <div class="picture">
                    <img src="img/free${i}.jpeg" alt="이미지">
                    <div class="more"></div>
                    <p class="more_word">상세보기<i class="fa fa-plus-circle" aria-hidden="true"></i></p>
                </div>
                </a>
            </a>
        </li>
        `;
    }
    document.querySelector('.free_cont_list').innerHTML = freeHtml;
    
    allData.push(freeInfo);
    let name = document.querySelector('.name > dt').textContent;
    console.log(name);
}

getData();


// function popup (){
//     console.log(allData[0].length);
//     for(let i=0; i<allData[0].length; i++){
//             window.alert(`시설명: ${allData[0][i].name}
// 주소: ${allData[0][i].roadAdr}
// 전화번호: ${allData[0][i].tel}
// 시간: ${allData[0][i].foodtime}
// 때: ${allData[0][i].day}
// 대상: ${allData[0][i].who}`);
//         console.log(freeHtml);
//     };
// };




