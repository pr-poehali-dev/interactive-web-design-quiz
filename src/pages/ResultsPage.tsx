import { useLocation, useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { questions } from "@/data/questions";

function getLevel(score: number) {
  if (score >= 90) return { label: "Эксперт", color: "text-green-700", bg: "bg-green-50 border-green-200", icon: "Award" };
  if (score >= 70) return { label: "Продвинутый", color: "text-blue-700", bg: "bg-blue-50 border-blue-200", icon: "TrendingUp" };
  if (score >= 50) return { label: "Средний уровень", color: "text-amber-700", bg: "bg-amber-50 border-amber-200", icon: "Target" };
  return { label: "Начинающий", color: "text-red-700", bg: "bg-red-50 border-red-200", icon: "BookOpen" };
}

export default function ResultsPage() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: { answers: number[]; score: number } };

  if (!state) {
    navigate("/");
    return null;
  }

  const { answers, score } = state;
  const level = getLevel(score);
  const correct = answers.filter((a, i) => a === questions[i].correct).length;

  const topicScores: Record<string, { correct: number; total: number }> = {};
  questions.forEach((q, i) => {
    if (!topicScores[q.topic]) topicScores[q.topic] = { correct: 0, total: 0 };
    topicScores[q.topic].total++;
    if (answers[i] === q.correct) topicScores[q.topic].correct++;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col animate-fade-in">
      <header className="border-b border-border bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <Icon name="PenTool" size={16} className="text-primary-foreground" />
            </div>
            <span className="font-sans text-sm tracking-widest uppercase text-primary font-medium">
              WebDesign Assessment
            </span>
          </button>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="animate-slide-up">
            <div className="bg-white border border-border rounded-sm p-8 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <p className="font-sans text-xs text-muted-foreground uppercase tracking-widest mb-2">Результат тестирования</p>
                  <div className="flex items-end gap-4">
                    <span className="font-serif text-7xl font-semibold text-primary">{score}</span>
                    <span className="font-serif text-2xl text-muted-foreground mb-2">/ 100</span>
                  </div>
                  <p className="font-sans text-sm text-muted-foreground mt-1">
                    Правильных ответов: <span className="text-foreground font-medium">{correct} из {questions.length}</span>
                  </p>
                </div>
                <div className={`flex items-center gap-3 border px-6 py-4 rounded-sm ${level.bg}`}>
                  <Icon name={level.icon} size={24} className={level.color} />
                  <div>
                    <p className="text-xs font-sans text-muted-foreground">Уровень</p>
                    <p className={`font-serif text-xl font-semibold ${level.color}`}>{level.label}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-1000"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border border-border rounded-sm p-6">
                <h3 className="font-sans font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
                  Результаты по темам
                </h3>
                <div className="space-y-4">
                  {Object.entries(topicScores).map(([topic, data]) => {
                    const pct = (data.correct / data.total) * 100;
                    return (
                      <div key={topic}>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-sm font-sans text-foreground">{topic}</span>
                          <span className="text-xs font-sans text-muted-foreground">
                            {data.correct}/{data.total}
                          </span>
                        </div>
                        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${pct === 100 ? "bg-green-500" : pct >= 50 ? "bg-primary" : "bg-red-400"}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-primary rounded-sm p-6 text-primary-foreground">
                <h3 className="font-sans font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/70">
                  Рекомендации
                </h3>
                <div className="space-y-3">
                  {score < 40 && (
                    <p className="font-sans text-sm leading-relaxed">Рекомендуем начать с базовых курсов по типографике и теории цвета. Изучите фундаментальные принципы дизайна.</p>
                  )}
                  {score >= 40 && score < 70 && (
                    <p className="font-sans text-sm leading-relaxed">Хорошая база! Углубитесь в UX-принципы и современные дизайн-системы. Практикуйте работу в Figma.</p>
                  )}
                  {score >= 70 && score < 90 && (
                    <p className="font-sans text-sm leading-relaxed">Уверенный уровень! Изучите продвинутые паттерны взаимодействия и методологии исследования пользователей.</p>
                  )}
                  {score >= 90 && (
                    <p className="font-sans text-sm leading-relaxed">Отличный результат! Вы обладаете глубокими профессиональными знаниями в области веб-дизайна.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white border border-border rounded-sm overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-border">
                <h3 className="font-sans font-semibold text-foreground text-sm uppercase tracking-wider">
                  Разбор вопросов
                </h3>
              </div>
              <div className="divide-y divide-border">
                {questions.map((q, i) => {
                  const isCorrect = answers[i] === q.correct;
                  return (
                    <div key={q.id} className="px-6 py-5">
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-sm flex items-center justify-center mt-0.5 ${isCorrect ? "bg-green-100" : "bg-red-100"}`}>
                          {isCorrect
                            ? <Icon name="Check" size={13} className="text-green-600" />
                            : <Icon name="X" size={13} className="text-red-500" />
                          }
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-sans text-muted-foreground uppercase tracking-wider">{q.topic}</span>
                            <span className="text-xs font-sans text-muted-foreground">·</span>
                            <span className={`text-xs font-sans font-medium ${isCorrect ? "text-green-600" : "text-red-500"}`}>
                              {isCorrect ? "+10 баллов" : "0 баллов"}
                            </span>
                          </div>
                          <p className="font-sans text-sm font-medium text-foreground mb-2">{q.text}</p>
                          {!isCorrect && (
                            <p className="text-xs font-sans text-muted-foreground mb-1">
                              Ваш ответ: <span className="text-red-600">{q.options[answers[i]]}</span>
                              {" · "}
                              Верно: <span className="text-green-600">{q.options[q.correct]}</span>
                            </p>
                          )}
                          <p className="text-xs font-sans text-muted-foreground leading-relaxed">{q.explanation}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => navigate("/test")}
                className="bg-primary text-primary-foreground font-sans font-medium text-sm px-8 py-3.5 rounded-sm hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <Icon name="RefreshCw" size={15} />
                Пройти заново
              </button>
              <button
                onClick={() => navigate("/")}
                className="border border-border text-foreground font-sans font-medium text-sm px-6 py-3.5 rounded-sm hover:bg-secondary transition-colors"
              >
                На главную
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-6">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <p className="text-xs font-sans text-muted-foreground">WebDesign Assessment — профессиональное тестирование</p>
          <p className="text-xs font-sans text-muted-foreground">2026</p>
        </div>
      </footer>
    </div>
  );
}
