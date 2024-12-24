import React, { useEffect, useState } from 'react';
import ChartUserResults from '../../Components/Chart/ChartUserResults';
import { useLocation, useParams } from 'react-router-dom';
import { getAllResultsByExamId } from '../../Services/APImocktest';
import { Button } from 'antd';

function StatisticExam() {
    const {examId} = useParams();
    const locations = useLocation()
    const name = locations.state
    const [dataResults , setDataResults] = useState([])
    const handleGetData =  () =>{
            getAllResultsByExamId({examId : examId ,
                sortCreateDate : true}).then((res)=>{
                console.log(res.data.body.data.items);
                setDataResults(res?.data?.body?.data?.items)
            }).catch((err) =>{
                console.log(err);
            })
    }
    useEffect(() =>{
        handleGetData();
    },[])
    return (
        <div>
            {/* <Button onClick={()=> handleGetData()}>Click</Button> */}
            <h2 className='text-orange-500 font-medium text-lg uppercase text-center my-5'>

            đây là trang thống kê {name}
            </h2>
            <ChartUserResults data={dataResults} title = {"Biểu đồ thống kê danh sách điểm của bài thi "}/>
        </div>
    );
}

export default StatisticExam;