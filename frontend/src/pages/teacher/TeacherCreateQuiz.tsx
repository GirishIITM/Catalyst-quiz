import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Save, Eye } from "lucide-react";
import Header from "@/components/header";
import { SidebarInset } from "@/components/ui/sidebar";
import { teacherApi } from "@/api";
import { loadingStore } from "@/states/loading";
import toast from "react-hot-toast";

interface QuestionOption {
  label: string;
  text: string;
  is_correct: boolean;
}

interface QuizQuestion {
  question_text: string;
  question_type: "text" | "mcq_single" | "mcq_multiple";
  options: QuestionOption[];
  answer_key?: string;
  difficulty: "easy" | "medium" | "hard";
}

interface QuizFormData {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  deadline: string;
  questions: QuizQuestion[];
}

export default function TeacherCreateQuiz() {
  const navigate = useNavigate();
  const params = useParams();
  const classroomId = params.classroom || "";

  const form = useForm<QuizFormData>({
    defaultValues: {
      title: "",
      description: "",
      difficulty: "medium",
      deadline: "",
      questions: [
        {
          question_text: "",
          question_type: "mcq_single",
          options: [
            { label: "A", text: "", is_correct: false },
            { label: "B", text: "", is_correct: false },
          ],
          difficulty: "medium",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const addQuestion = () => {
    append({
      question_text: "",
      question_type: "mcq_single",
      options: [
        { label: "A", text: "", is_correct: false },
        { label: "B", text: "", is_correct: false },
      ],
      difficulty: "medium",
    });
  };

  const addOption = (questionIndex: number) => {
    const currentOptions = form.getValues(`questions.${questionIndex}.options`);
    const nextLabel = String.fromCharCode(65 + currentOptions.length); // A, B, C, D...

    form.setValue(`questions.${questionIndex}.options`, [
      ...currentOptions,
      { label: nextLabel, text: "", is_correct: false },
    ]);
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const currentOptions = form.getValues(`questions.${questionIndex}.options`);
    if (currentOptions.length > 2) {
      const newOptions = currentOptions.filter((_, index) => index !== optionIndex);
      const updatedOptions = newOptions.map((option, index) => ({
        ...option,
        label: String.fromCharCode(65 + index),
      }));
      form.setValue(`questions.${questionIndex}.options`, updatedOptions);
    }
  };

  const onSubmit = async (data: QuizFormData) => {
    try {
      loadingStore.getState().setLoading(true);
      const quizResponse = await teacherApi.createQuiz(classroomId, {
        title: data.title,
        description: data.description,
        difficulty: data.difficulty,
        deadline: data.deadline,
      });

      for (const question of data.questions) {
        await teacherApi.createQuestion(quizResponse.quiz_id, {
          question_text: question.question_text,
          question_type: question.question_type,
          answer_key: question.question_type === "text" ? question.answer_key : undefined,
          difficulty: question.difficulty,
        });
      }

      toast.success("Quiz created successfully!");
      navigate(`/${classroomId}/teacher/my-quizzes`);
    } catch (error) {
      toast.error("Failed to create quiz");
      console.error(error);
    } finally {
      loadingStore.getState().setLoading(false);
    }
  };

  const handlePreview = () => {
    toast.dismiss("Preview functionality coming soon!");
  };

  return (
    <SidebarInset>
      <Header title="Create Quiz" />
      <div className="py-6 px-8 mt-14 max-w-10xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold desktop-only">Create New Quiz</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button form="quiz-form" type="submit">
              <Save className="w-4 h-4 mr-2" />
              Save Quiz
            </Button>
          </div>
        </div>

        <Form {...form}>
          <form id="quiz-form" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-2">
                <div className="sticky top-20">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quiz Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="title"
                        rules={{ required: "Quiz title is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quiz Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter quiz title"
                                className="text-lg font-medium"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter quiz description (optional)"
                                rows={3}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="difficulty"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Difficulty</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select difficulty" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="easy">Easy</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="hard">Hard</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="deadline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Deadline (Optional)</FormLabel>
                            <FormControl>
                              <Input type="datetime-local" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Quiz Summary */}
                      <div className="pt-4 border-t">
                        <h3 className="font-medium mb-2">Quiz Summary</h3>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex justify-between">
                            <span>Total Questions:</span>
                            <span className="font-medium">{fields.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>MCQ Questions:</span>
                            <span className="font-medium">
                              {fields.filter(f => form.watch(`questions.${fields.indexOf(f)}.question_type`)?.includes('mcq')).length}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Text Questions:</span>
                            <span className="font-medium">
                              {fields.filter(f => form.watch(`questions.${fields.indexOf(f)}.question_type`) === 'text').length}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Questions Panel - Right Side */}
              <div className="lg:col-span-3">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Questions</h2>
                    <Button type="button" onClick={addQuestion}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Question
                    </Button>
                  </div>

                  {fields.map((field, questionIndex) => (
                    <Card key={field.id}>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Question {questionIndex + 1}</CardTitle>
                          {fields.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => remove(questionIndex)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name={`questions.${questionIndex}.question_text`}
                          rules={{ required: "Question text is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Question Text</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Enter your question here..."
                                  rows={2}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`questions.${questionIndex}.question_type`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Question Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="mcq_single">Multiple Choice (Single)</SelectItem>
                                    <SelectItem value="mcq_multiple">Multiple Choice (Multiple)</SelectItem>
                                    <SelectItem value="text">Text Answer</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`questions.${questionIndex}.difficulty`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Question Difficulty</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="easy">Easy</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="hard">Hard</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Options for MCQ questions */}
                        {form.watch(`questions.${questionIndex}.question_type`)?.includes("mcq") && (
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <FormLabel>Answer Options</FormLabel>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addOption(questionIndex)}
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Option
                              </Button>
                            </div>

                            {form.watch(`questions.${questionIndex}.options`)?.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                                  {option.label}
                                </span>
                                <FormField
                                  control={form.control}
                                  name={`questions.${questionIndex}.options.${optionIndex}.text`}
                                  rules={{ required: "Option text is required" }}
                                  render={({ field }) => (
                                    <FormItem className="flex-1">
                                      <FormControl>
                                        <Input
                                          placeholder={`Option ${option.label}`}
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                {form.watch(`questions.${questionIndex}.options`)?.length > 2 && (
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeOption(questionIndex, optionIndex)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {form.watch(`questions.${questionIndex}.question_type`) === "text" && (
                          <FormField
                            control={form.control}
                            name={`questions.${questionIndex}.answer_key`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expected Answer (Optional)</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter expected answer for reference..."
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </SidebarInset>
  );
}
