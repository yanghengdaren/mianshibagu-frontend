"use server";
import Title from "antd/es/typography/Title";
import "./index.css";
import {listQuestionBankVoByPageUsingPost} from "@/api/questionBankController";
import PageQuestionBankVO_ = API.PageQuestionBankVO_;
import QuestionBankList from "@/components/QuestionBankList";
import QuestionBankVO = API.QuestionBankVO;

/**
 * 题库列表页面
 * @constructor
 */
export default async function BanksPage() {

    let questionBankList: QuestionBankVO[] = [];
    //题库数量不多直接全量获取
    const pageSize = 200;
    try {
        const questionBankRes = await listQuestionBankVoByPageUsingPost({
            pageSize,
            sortField: 'createTime',
            sortOrder: 'descend',
        })
        questionBankList = (questionBankRes.data as PageQuestionBankVO_).records ?? [];
    } catch (e:any) {
        console.error('获取题库列表失败，' + e.message);
    }


  return (
    <div id="BanksPage" className="max-width-content">
        <Title level={3}>题库大全</Title>
        <QuestionBankList questionBankList={questionBankList} />
    </div>
  );
}
