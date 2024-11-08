"use server";
import Title from "antd/es/typography/Title";
import { Divider, Flex } from "antd";
import "./index.css";
import Link from "next/link";
import {listQuestionBankVoByPageUsingPost} from "@/api/questionBankController";
import {listQuestionVoByPageUsingPost} from "@/api/questionController";
import PageQuestionBankVO_ = API.PageQuestionBankVO_;
import PageQuestionVO_ = API.PageQuestionVO_;
import QuestionBankList from "@/components/QuestionBankList";
import QuestionBankVO = API.QuestionBankVO;
import QuestionList from "@/components/QuestionList";
import QuestionVO = API.QuestionVO;

/**
 * 主页
 * @constructor
 */
export default async function HomePage() {

    let questionBankList: QuestionBankVO[] = [];
    let questionList: QuestionVO[] = [];

    try {
        const questionBankRes = await listQuestionBankVoByPageUsingPost({
            pageSize: 12,
            sortField: 'createTime',
            sortOrder: 'descend',
        })
        questionBankList = (questionBankRes.data as PageQuestionBankVO_).records ?? [];
    } catch (e:any) {
        console.error('获取题库列表失败，' + e.message);
    }

    try {
        const questionListRes = await listQuestionVoByPageUsingPost({
            pageSize: 12,
            sortField: 'createTime',
            sortOrder: 'descend',
        })
        questionList = (questionListRes.data as PageQuestionVO_).records ?? [];
    } catch (e:any) {
        console.error('获取题目列表失败，' + e.message);
    }

  return (
    <div id="homePage" className="max-width-content">
      <Flex justify="space-between" align="center">
        <Title level={3}>最新题库</Title>
        <Link href={"/banks"}>查看更多</Link>
      </Flex>
        <QuestionBankList questionBankList={questionBankList} />
      <Divider />
      <Flex justify="space-between" align="center">
        <Title level={3}>最新题目</Title>
        <Link href={"/questions"}>查看更多</Link>
      </Flex>
        <QuestionList questionList={questionList}></QuestionList>
    </div>
  );
}
