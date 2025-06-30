// @ts-nocheck
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] // cubic-bezier equivalent of "easeOut"
      }
    }
  };

  const quoteCardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] // cubic-bezier equivalent of "easeOut"
      }
    }
  };

  return (
    <>
      <section className="p-8 md:p-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto" id="features">
        {/* Centered intro section */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Learn Anytime, Anywhere with QuizCatalyst AI
          </motion.h2>
          <motion.p 
            className="text-muted-foreground leading-relaxed mb-6 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            At QuizCatalyst AI we harness advanced AI models for automatic grading, plagiarism detection, semantic evaluation, and personalized quiz creation. Students and teachers enjoy interactive notes, adaptive quizzes, and instant feedback that powers continuous growth.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-primary hover:bg-primary-hover text-black font-bold">
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        {/* Feature cards in responsive grid */}
        <motion.div 
          className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div variants={cardVariants}>
            <motion.div
              whileHover={{ 
                scale: 1.03, 
                y: -5,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="p-6 border border-[var(--card-border-color)] rounded-xl bg-card hover:shadow-lg transition-all duration-200">
                <CardContent className="p-0">
                  <motion.div 
                    className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span className="text-2xl">🏫</span>
                  </motion.div>
                  <h4 className="mb-3 font-semibold text-foreground text-lg">
                    Create Virtual Classrooms with AI Insights
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Organize courses, invite learners, and let AI suggest lesson sequencing and quiz schedules.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={cardVariants}>
            <motion.div
              whileHover={{ 
                scale: 1.03, 
                y: -5,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="p-6 border border-[var(--card-border-color)] rounded-xl bg-card hover:shadow-lg transition-all duration-200">
                <CardContent className="p-0">
                  <motion.div 
                    className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span className="text-2xl">📤</span>
                  </motion.div>
                  <h4 className="mb-3 font-semibold text-foreground text-lg">
                    Streamline Resource Uploads with AI Tagging
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Upload PDFs or docs and let our AI automatically extract topics, generate tags, and suggest related quizzes.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={cardVariants}>
            <motion.div
              whileHover={{ 
                scale: 1.03, 
                y: -5,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="p-6 border border-[var(--card-border-color)] rounded-xl bg-card hover:shadow-lg transition-all duration-200">
                <CardContent className="p-0">
                  <motion.div 
                    className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span className="text-2xl">✍️</span>
                  </motion.div>
                  <h4 className="mb-3 font-semibold text-foreground text-lg">
                    Submit Answers with AI OCR & Evaluation
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Type responses or snap handwritten work. Our AI extracts text, grades answers, and offers instant feedback.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={cardVariants}>
            <motion.div
              whileHover={{ 
                scale: 1.03, 
                y: -5,
                boxShadow: "0 10px 25px rgba(255,193,7,0.2)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="p-6 border border-yellow-200 dark:border-yellow-700/50 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 hover:shadow-lg transition-all duration-200">
                <CardContent className="p-0">
                  <motion.div 
                    className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span className="text-2xl">⚡</span>
                  </motion.div>
                  <h4 className="mb-3 font-semibold text-yellow-800 dark:text-yellow-200 text-lg">
                    Live Quiz Interaction
                  </h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 leading-relaxed">
                    Send quizzes in real time and watch students respond live — ideal for instant feedback and active classroom engagement.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={cardVariants}>
            <motion.div
              whileHover={{ 
                scale: 1.03, 
                y: -5,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="p-6 border border-[var(--card-border-color)] rounded-xl bg-card hover:shadow-lg transition-all duration-200">
                <CardContent className="p-0">
                  <motion.div 
                    className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span className="text-2xl">🤖</span>
                  </motion.div>
                  <h4 className="mb-3 font-semibold text-foreground text-lg">
                    AI‑Powered Quiz Generation
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Generate custom quizzes based on student performance and topic mastery in real time.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={cardVariants}>
            <motion.div
              whileHover={{ 
                scale: 1.03, 
                y: -5,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="p-6 border border-[var(--card-border-color)] rounded-xl bg-card hover:shadow-lg transition-all duration-200">
                <CardContent className="p-0">
                  <motion.div 
                    className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span className="text-2xl">🔍</span>
                  </motion.div>
                  <h4 className="mb-3 font-semibold text-foreground text-lg">
                    Plagiarism Detection
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Automatically scan submissions for copied content and receive detailed similarity reports.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={cardVariants}>
            <motion.div
              whileHover={{ 
                scale: 1.03, 
                y: -5,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="p-6 border border-[var(--card-border-color)] rounded-xl bg-card hover:shadow-lg transition-all duration-200">
                <CardContent className="p-0">
                  <motion.div 
                    className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span className="text-2xl">🧠</span>
                  </motion.div>
                  <h4 className="mb-3 font-semibold text-foreground text-lg">
                    Semantic Evaluation
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Leverage AI to assess answer quality, token usage, and deeper understanding beyond keywords.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={cardVariants}>
            <motion.div
              whileHover={{ 
                scale: 1.03, 
                y: -5,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="p-6 border border-[var(--card-border-color)] rounded-xl bg-card hover:shadow-lg transition-all duration-200">
                <CardContent className="p-0">
                  <motion.div 
                    className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span className="text-2xl">🔄</span>
                  </motion.div>
                  <h4 className="mb-3 font-semibold text-foreground text-lg">
                    Re‑Review Requests
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Students can request a human re‑grade with context, and teachers can track every appeal.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section className="p-8 md:p-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl font-bold mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Driving Intelligent Learning Today
          </motion.h2>
          <motion.p 
            className="text-muted-foreground mb-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Every learner has unique strengths. QuizCatalyst AI adapts with semantic evaluation, plagiarism checks, and dynamic quiz generation to ensure no one falls behind.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-primary hover:bg-primary-hover text-black font-bold mb-8">
              Get Started Free
            </Button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div variants={quoteCardVariants}>
            <motion.div
              whileHover={{ 
                scale: 1.02, 
                y: -8,
                boxShadow: "0 15px 30px rgba(255,152,0,0.15)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="w-full max-w-80 rounded-2xl border border-orange-200 dark:border-orange-700/50 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6 text-center">
                <CardContent className="p-0">
                  <motion.div 
                    className="w-16 h-16 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center mx-auto mb-4"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span className="text-3xl">🎯</span>
                  </motion.div>
                  <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-2">
                    Success is the sum of small efforts, repeated day in and day out.
                  </h3>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={quoteCardVariants}>
            <motion.div
              whileHover={{ 
                scale: 1.02, 
                y: -8,
                boxShadow: "0 15px 30px rgba(147,51,234,0.15)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="w-full max-w-80 rounded-2xl border border-purple-200 dark:border-purple-700/50 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 text-center">
                <CardContent className="p-0">
                  <motion.div 
                    className="w-16 h-16 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-4"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span className="text-3xl">🌱</span>
                  </motion.div>
                  <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-2">
                    The expert in anything was once a beginner.
                  </h3>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={quoteCardVariants}>
            <motion.div
              whileHover={{ 
                scale: 1.02, 
                y: -8,
                boxShadow: "0 15px 30px rgba(34,197,94,0.15)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="w-full max-w-80 rounded-2xl border border-green-200 dark:border-green-700/50 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 text-center">
                <CardContent className="p-0">
                  <motion.div 
                    className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span className="text-3xl">📚</span>
                  </motion.div>
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                    Education is not preparation for life; education is life itself.
                  </h3>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
