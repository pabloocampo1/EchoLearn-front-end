import { CategoryTwoTone, Home, HomeMaxOutlined } from '@mui/icons-material';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

export const adminOptions = [
  // { name: "home", title: "Home", path: "/", icon: <Home /> },
  { name: "dashboard", title: "Dashboard", path: "/app", icon: <InsertChartIcon /> },
  { name: "users", title: "Users", path: "users", icon: <SupervisedUserCircleIcon /> },
  { name: "exams", title: "exams", path: "exams/managment", icon: <InsertChartIcon /> },
  { name: "blog", title: "Blog", path: "blog", icon: <InsertChartIcon /> },
  { name: "category", title: "Category", path: "categorys", icon: <CategoryTwoTone /> },
];
