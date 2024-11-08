"use server";
import { Flex, Menu } from "antd";
import "./index.css";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import Title from "antd/es/typography/Title";
import QuestionBankVO = API.QuestionBankVO;
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import QuestionCard from "@/components/QuestionCard";
import Link from "next/link";

/**
 * 题库题目详情页
 * @constructor
 */
export default async function BankQuestionPage({
  params,
}: {
  params: Record<string, any>;
}) {
  const { questionBankId, questionId } = params;
  //获取题库详情
  let bank = undefined;

  try {
    const bankRes = await getQuestionBankVoByIdUsingGet({
      id: questionBankId,
      needQueryQuestionList: true,
      //todo分页
      pageSize: 200,
    });
    bank = bankRes.data as QuestionBankVO;
  } catch (e: any) {
    console.error("获取题库详情失败，" + e.message);
  }
  if (!bank) {
    return <div>获取题库详情失败，请刷新重试</div>;
  }
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
  // 题目菜单列表
  const questionMenuItemList = (bank.questionPage?.records || []).map((q) => {
    return {
      label: (
        <Link href={`/bank/${questionBankId}/question/${q.id}`}>{q.title}</Link>
      ),
      key: q.id ?? 0,
    };
  });
  return (
    <div id="bankQuestionPage">
      <Flex gap={24}>
        <Sider width={240} theme="light" style={{ padding: "24px 0" }}>
          <Title level={4} style={{ padding: "0 20px" }}>
            {bank.title}
          </Title>
          <Menu items={questionMenuItemList} selectedKeys={[question.id?.toString()||""]}/>
        </Sider>
        <QuestionCard question={question}></QuestionCard>
      </Flex>
    </div>
  );
}
