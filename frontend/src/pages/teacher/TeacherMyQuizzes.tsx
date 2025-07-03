import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Eye, Calendar, Users, FileText, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header";
import { quizStore } from "@/states/quiz";
import { SidebarInset } from "@/components/ui/sidebar";
import { useParams, useNavigate } from "react-router-dom";

export default function TeacherMyQuizzes() {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<string>("");
  const { quizzes, fetchQuizzes, deleteQuiz, publishQuiz } = quizStore();
  const params = useParams();
  const navigate = useNavigate();
  const classroomId = params.classroom || "";

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  const handleDeleteQuiz = async (quizId: string) => {
    await deleteQuiz(quizId);
    setDeleteOpen(false);
    setQuizToDelete("");
  };

  const openDeleteDialog = (quizId: string) => {
    setQuizToDelete(quizId);
    setDeleteOpen(true);
  };

  const handlePublishQuiz = async (quizId: string) => {
    await publishQuiz(quizId);
  };

  const handleCreateQuiz = () => {
    navigate(`/${classroomId}/teacher/create-quiz`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <SidebarInset>
      <Header title="My Quizzes" />
      <div className="p-6 mt-14">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Quizzes</h1>
          <Button onClick={handleCreateQuiz}>
            <Plus className="w-4 h-4 mr-2" />
            Create Quiz
          </Button>
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Quiz</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Are you sure you want to delete this quiz? This action cannot be undone and will permanently remove all associated data.
              </p>
              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setDeleteOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="button" 
                  variant="destructive"
                  onClick={() => handleDeleteQuiz(quizToDelete)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {quizzes.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No Quizzes Yet</h2>
            <p className="text-muted-foreground mb-4">Create your first quiz to get started</p>
            <Button onClick={handleCreateQuiz}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Quiz
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-lg line-clamp-2">{quiz.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className={getDifficultyColor(quiz.difficulty)}>
                          {quiz.difficulty}
                        </Badge>
                        {quiz.is_published ? (
                          <Badge variant="default">Published</Badge>
                        ) : (
                          <Badge variant="secondary">Draft</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openDeleteDialog(quiz.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {quiz.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {quiz.description}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        <span>{quiz.question_count} questions</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{quiz.classroom_name}</span>
                      </div>
                    </div>

                    {quiz.deadline && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Due: {formatDate(quiz.deadline)}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Created: {formatDate(quiz.created_at)}</span>
                    </div>

                    {!quiz.is_published && (
                      <div className="pt-2">
                        <Button 
                          size="sm" 
                          className="w-full"
                          onClick={() => handlePublishQuiz(quiz.id)}
                        >
                          Publish Quiz
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </SidebarInset>
  );
}
