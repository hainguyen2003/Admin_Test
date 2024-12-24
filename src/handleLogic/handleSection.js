
import { deleteSection } from "../Services/APImocktest";
import request from "../Services/request";
export const handleGetDetailsExam =async (id) =>{
    try{
         const res =   await request.get(`/mocktest/exam/detail/${id}`) ;
        //  console.log("data : ",res?.data?.body?.data);
       return res?.data?.body?.data || [] ;

    }catch(err){
        console.log(err);
    }
}
export const handleDeleteSection =async (id) =>{
    const res =await  deleteSection(id);
    try {
        console.log(res.data);
        return res?.data ;
        
    } catch (error) {
        console.log("Error in delete section : " , error);
    }
}

// export const updateExam

