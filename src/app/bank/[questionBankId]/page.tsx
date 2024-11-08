"use server";
import { Avatar, Button, Card, Divider, Flex, Typography } from "antd";
import "./index.css";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import Meta from "antd/es/card/Meta";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import QuestionList from "@/components/QuestionList";
import QuestionBankVO = API.QuestionBankVO;

/**
 * 题库详情页
 * @constructor
 */
export default async function BankPage({
  params,
}: {
  params: Record<string, any>;
}) {
  const { questionBankId } = params;
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

  //获取第一道题目,用于开始刷题
  let firstQuestionId;
  if (bank.questionPage?.records && bank.questionPage.records.length > 0) {
    firstQuestionId = bank.questionPage.records[0].id;
  }
  return (
    <div id="bankPage" className="max-width-content">
      <Card>
        <Meta
          avatar={<Avatar src={bank.picture} size={72} />}
          title={
            <Title level={3} style={{ marginBottom: 0 }}>
              {bank.title}
            </Title>
          }
          description={
            <>
              <Paragraph type="secondary">{bank.description}</Paragraph>
              <Button
                type={"primary"}
                shape="round"
                href={`/bank/${questionBankId}/question/${firstQuestionId}`}
                target={"_blank"}
                disabled={!firstQuestionId}
              >
                开始刷题
              </Button>
            </>
          }
        />
      </Card>
      <div style={{ marginBottom: 16 }} />
      <QuestionList
        questionBankId={questionBankId}
        questionList={bank.questionPage?.records || []}
        cardTitle={`题目列表（${bank.questionPage?.total || 0}）`}
      />
    </div>
  );
}
