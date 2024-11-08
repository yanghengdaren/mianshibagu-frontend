"use server";
import Title from "antd/es/typography/Title";
import "./index.css";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import PageQuestionVO_ = API.PageQuestionVO_;
import QuestionTable from "@/components/QuestionTable";
import QuestionVO = API.QuestionVO;

/**
 * 题目列表页面
 * @constructor
 */
export default async function QuestionsPage({
  searchParams,
}: {
  searchParams: Record<string, any>;
}) {
  //获取url的查询参数
  const { q: searchText } = searchParams;
  //题目列表总数
  let questionList: QuestionVO[] = [];
  let total = 0;
  try {
  //todo 根据标签搜索题目
    const questionRes = await listQuestionVoByPageUsingPost({
      title: searchText,
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionList = (questionRes.data as PageQuestionVO_).records ?? [];
    total = (questionRes.data as PageQuestionVO_).total ?? 0;
  } catch (e: any) {
    console.error("获取题目列表失败，" + e.message);
  }

  return (
    <div id="questionsPage" className="max-width-content">
      <Title level={3}>题目大全</Title>
      <QuestionTable
        defaultQuestionList={questionList}
        defaultTotal={total}
        defaultSearchParams={{ title: searchText }}
      />
    </div>
  );
}
