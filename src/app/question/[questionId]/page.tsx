"use server";
import "./index.css";
import QuestionBankVO = API.QuestionBankVO;
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import QuestionCard from "@/components/QuestionCard";

/**
 * 题目详情页
 * @constructor
 */
export default async function QuestionPage({
  params,
}: {
  params: Record<string, any>;
}) {
  const { questionId } = params;
  //获取题目详情
  let question = undefined;

  try {
    const bankRes = await getQuestionVoByIdUsingGet({
      id: questionId,
    });
    question = bankRes.data as QuestionBankVO;
  } catch (e: any) {
    console.error("获取题目详情失败，" + e.message);
  }
  if (!question) {
    return <div>获取题目详情失败，请刷新重试</div>;
  }
  return (
    <div id="questionPage">
      <QuestionCard question={question}></QuestionCard>
    </div>
  );
}
