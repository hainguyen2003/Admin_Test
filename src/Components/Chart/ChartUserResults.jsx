import { Column } from '@ant-design/plots';
import React from 'react';
function ChartUserResults({data , title}) {
    
  
    const config = {
      data,
      xField: 'id',
      yField: 'totalPoint',
      xAxis: {
        label: {
          autoRotate: false,
        },
      },
      slider: {
        start: 0.1,
        end: 0.2,
      },
    };
    return (
        <div>
          
             <Column {...config} />
             <h2 className='text-center text-base font-medium'>{title} </h2>
        </div>
    );
}

export default ChartUserResults;


