import { routes } from "@/types/routes";
import { BookOpenIcon, QuestionMarkCircleIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import {
  Gauge,
  MessageSquareText
} from "lucide-react";
import { Link } from "react-router-dom";

function StudentBottomBar() {
  const links = [
    {
      name: "Profile",
      to: routes.student.profile.replace(":classroom", "math-101"),
      icon: <UserCircleIcon className="h-5 w-5" />,
    },
    {
      name: "Quizzes",
      to: routes.student.takeQuiz.replace(":classroom", "math-101"),
      icon: <QuestionMarkCircleIcon className="h-5 w-5" />,
    },
    {
      name: "Dashboard",
      to: routes.student.dashboard.replace(":classroom", "math-101"),
      icon: <Gauge className="h-5 w-5" />,
    },
    {
      name: "Feedback",
      to: routes.student.feedback.replace(":classroom", "math-101"),
      icon: <MessageSquareText className="h-5 w-5" />,
    },
    {
      name: "Notes",
      to: routes.student.viewNotes.replace(":classroom", "math-101"),
      icon: <BookOpenIcon className="h-5 w-5" />,
    },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-5 px-6 py-3 bg-white backdrop-blur-md bg-opacity-80 dark:bg-gray-900/90 rounded-full shadow-2xl ring-1 ring-black/10 z-40 md:hidden transition-all">
      <div className="flex justify-between items-center space-x-6">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.to}
            className={`${
              window.location.pathname === link.to
                ? "bg-orange-500 text-white scale-110"
                : "text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-800 hover:text-orange-500"
            } flex items-center justify-center p-3 rounded-full transition-all duration-300 ease-in-out`}
          >
            {link.icon}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default StudentBottomBar;
