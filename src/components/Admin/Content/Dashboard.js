import { Tooltip } from "react-bootstrap";
import "./Dashboard.scss";
import {
  ResponsiveContainer,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
} from "recharts";
import { getOverview } from "../../../services/apiService";
import { useState, useEffect } from "react";

const Dashboard = (props) => {
  const [dataOverview, setDataOverview] = useState({
    users: { total: 0 },
    others: { countQuiz: 0, countQuestions: 0, countAnswers: 0 },
  });
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let res = await getOverview();
      if (res && res.EC === 0 && res.DT) {
        const users = res.DT.users || { total: 0 };
        const others = res.DT.others || {
          countQuiz: 0,
          countQuestions: 0,
          countAnswers: 0,
        };

        setDataOverview({ users, others });

        const data = [
          { name: "Quizzes", Qz: others.countQuiz || 0 },
          { name: "Questions", Qs: others.countQuestions || 0 },
          { name: "Answers", As: others.countAnswers || 0 },
        ];
        setDataChart(data);
      } else {
        console.error("Invalid API response", res);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="title">Analytics Dashboard</div>
      <div className="context">
        <div className="c-left">
          <div className="child">
            <div className="text-1">Total Users</div>
            <div className="text-2">{dataOverview?.users?.total || 0}</div>
          </div>
          <div className="child">
            <div className="text-1">Total Quizzes</div>
            <div className="text-2">{dataOverview?.others?.countQuiz || 0}</div>
          </div>
          <div className="child">
            <div className="text-1">Total Answers</div>
            <div className="text-2">{dataOverview?.others?.countAnswers || 0}</div>
          </div>
          <div className="child">
            <div className="text-1">Total Questions</div>
            <div className="text-2">{dataOverview?.others?.countQuestions || 0}</div>
          </div>
        </div>
        <div className="c-right">
          <ResponsiveContainer width="95%" height="100%">
            <BarChart data={dataChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Qz" fill="#ff7300" />
              <Bar dataKey="Qs" fill="#6884e8" />
              <Bar dataKey="As" fill="#387908" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
