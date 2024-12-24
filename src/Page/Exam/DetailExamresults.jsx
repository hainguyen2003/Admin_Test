


import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "antd";
import { detailExamResults } from "../../Services/APImocktest";
import { AppContext } from "../../Components/AppContext/AppContext";

function DetailExamresults() {
  const { resultId } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const {dispatch} = useContext(AppContext)
 

  useEffect(() => {
    detailExamResults(resultId)
      .then((res) => {
        console.log(res.data.body);
        setData(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });

      dispatch({type : "closeModalListResults"})
  }, []);

  const isAnswerCorrect = (question) => {
    return question.choiceUser?.every((choice) => question.choiceCorrect?.includes(choice));
  };

  return (
    <div className="w-[1400px] mx-5">
      <h2 className="text-3xl font-medium text-center my-5">Kết quả bài thi  </h2>


    <Button className="font-medium mr-10" onClick={() => navigate('/adminpage/user-test')}> Xem các bài thi khác </Button>
    {/* <Button className="font-medium " onClick={() => navigate('/all' ,{state : email})}> Xem thêm các kết quả bài thi khác </Button> */}

      <div className="text-left my-5">

        <p className="text-base text-orange-500 font-medium">Nhận xét bài thi : {data?.data?.comment}</p>
        <p className="text-base text-orange-500 font-medium">Điểm số đạt được : {data?.data?.point}</p>
      </div>
      {data &&
        data?.data?.detailResults?.map((item) => {
          const correct = isAnswerCorrect(item);
          return (
            <div key={item.question.id} className="my-4">
              <h2 className={`font-medium text-base`}>
               Câu hỏi : {item.question.content}
              </h2>
              <div className="grid grid-cols-2">
                {item.question.listAnswer?.map((answer) => {
                  const userAnswerIsCorrect = item.choiceUser?.includes(answer.answerKey) && item.choiceCorrect?.includes(answer.answerKey);
                  return (
                    <p
                      key={answer.id}
                      className={`col-span-1 ${userAnswerIsCorrect ? 'text-green-500 font-medium' : (item.choiceUser?.includes(answer.answerKey) ? 'text-[#ff0000] font-medium' : '')}`}
                    >
                      {answer.answer}
                    </p>
                  );
                })}
              </div>
              {(!correct && item.choiceUser?.length > 0) && (
                <div>
                  <p className="font-medium text-[#0014ff]">Câu trả lời đúng:</p>
                  {item?.question?.listAnswer
                    ?.filter((answer) => item.choiceCorrect?.includes(answer.answerKey))
                    ?.map((correctAnswer) => (
                      <p key={correctAnswer.id} className="font-medium text-[#0014ff]">{correctAnswer.answer}</p>
                    ))}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}

export default DetailExamresults;
