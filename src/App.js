import {useState,useEffect,useRef} from 'react';
// useEffect: 문서에서 딱 한번 실행하고 싶을때 , state값이 바뀔때마다 실행시키고 싶을때 사용
import d from "./data.json";
import Bar from './component/Bar';
import Pie from './component/Pie';
import "./App.css"


function App() {
  let data = [];
  let city = [];
  let table = [];
  // let elLi = useRef([]);
  //다중의 선택자를 잡을땐 []배열로 잡아야한다.

  for(let key in d){
    if(key != 'API' && key != 'korea'){
        data.push({
            "countryNm":d[key].countryNm,
            "vaccine_1":d[key].vaccine_1['vaccine_1'],
            "vaccine_2":d[key].vaccine_2['vaccine_2'],
            "vaccine_3":d[key].vaccine_3['vaccine_3']
      });

      city.push(
        {kor:d[key].countryNm,eng:key}
      );
      
      table.push(
        {
            city:d[key].countryNm,
            v1:[
                d[key].vaccine_1['vaccine_1_old'],
                d[key].vaccine_1['vaccine_1_new'],
                d[key].vaccine_1['vaccine_1'],
              ],
              v2:[
                d[key].vaccine_2['vaccine_2_old'],
                d[key].vaccine_2['vaccine_2_new'],
                d[key].vaccine_2['vaccine_2'],
              ],
              v3:[
                d[key].vaccine_3['vaccine_3_old'],
                d[key].vaccine_3['vaccine_3_new'],
                d[key].vaccine_3['vaccine_3'],
              ]
        }
      )
    }
  }

  console.log(table)

  

  //Pie
  let [cityNm,setCityNm] =useState('seoul');
  let [p_data,setPdata]=useState();

  useEffect(()=>{
    setPdata([
      {
          "id": "1차",
          "label": "1차 백신",
          "value": d[cityNm].vaccine_1['vaccine_1'],
      },
      {
          "id": "2차",
          "label": "2차 백신",
          "value": d[cityNm].vaccine_2['vaccine_2'],
      },
      {
          "id": "3차",
          "label": "3차 백신",
          "value": d[cityNm].vaccine_3['vaccine_3'],
      },
  ]);

  },[cityNm]);
  
    //예방접종현황


  function pieDataChange(e){  
    //pie 데이터 바꾸기 
    
    setCityNm(e.target.dataset.key);
    
    console.log(p_data)

  }
  return (
    <>
      <header> Corona-19 예방접종현황 </header>
        
          <div className="pie">
              <div className="list">
                <ul>
                    {
                        city.map((v)=>( 
                        <li 
                        data-key={v.eng} key={v.eng} onClick={pieDataChange}> {v.kor}({v.eng})  </li>  ))
                    }
                </ul>
              </div>
              <div className="graph"><Pie barData={p_data} /></div>
            </div>

          <Bar barData={data} />
            
            <table border="1">
            <thead>
                    <tr><th colSpan={8}>Corona-19-API-예방접종현황</th></tr>
                    <tr>
                        <th rowSpan="2">시도명</th>
                        <th colSpan="2">1차</th>
                        <th colSpan="2">2차</th>
                        <th colSpan="2">3차</th>
                        
                    </tr>
                    <tr>
                        <th>누적</th>
                        <th>신규</th>
                        <th>누적</th>
                        <th>신규</th>
                        <th>누적</th>
                        <th>신규</th>
                    </tr>
                </thead>
                <tbody>
                  {
                      table.map((v,k)=>(
                        <tr key={k}>
                            <td>{v.city}</td>
                            <td>{v.v1[0]}</td>
                            <td>{v.v1[1]}</td>
                            <td>{v.v2[0]}</td>
                            <td>{v.v2[1]}</td>
                            <td>{v.v3[0]}</td>
                            <td>{v.v3[1]}</td>
                        </tr>
                      ))
                    }
                </tbody>
            </table>



    </>
  );
}

export default App;