import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { questions } from "@/data/questions";

export default function TestPage() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const question = questions[current];
  const progress = ((current) / questions.length) * 100;
  const isLast = current === questions.length - 1;

  function handleSelect(idx: number) {
    if (confirmed) return;
    setSelected(idx);
  }

  function handleConfirm() {
    if (selected === null) return;
    setConfirmed(true);
  }

  function handleNext() {
    const newAnswers = [...answers, selected!];
    if (isLast) {
      const score = newAnswers.filter((a, i) => a === questions[i].correct).length * 10;
      navigate("/results", { state: { answers: newAnswers, score } });
    } else {
      setAnswers(newAnswers);
      setCurrent(current + 1);
      setSelected(null);
      setConfirmed(false);
    }
  }

  const optionStyle = (idx: number) => {
    if (!confirmed) {
      return selected === idx
        ? "border-primary bg-primary/5 text-primary"
        : "border-border bg-white text-foreground hover:border-primary/40 hover:bg-primary/3";
    }
    if (idx === question.correct) return "border-green-600 bg-green-50 text-green-800";
    if (idx === selected && selected !== question.correct) return "border-red-400 bg-red-50 text-red-700";
    return "border-border bg-white text-muted-foreground opacity-60";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col animate-fade-in">
      <header className="border-b border-border bg-white">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <Icon name="PenTool" size={16} className="text-primary-foreground" />
            </div>
            <span className="font-sans text-sm tracking-widest uppercase text-primary font-medium hidden sm:block">
              WebDesign Assessment
            </span>
          </button>
          <div className="flex items-center gap-3">
            <span className="font-sans text-sm text-muted-foreground">
              Вопрос <span className="text-primary font-medium">{current + 1}</span> из {questions.length}
            </span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 pb-4">
          <div className="h-1 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i < current ? "bg-primary" : i === current ? "bg-accent" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center">
        <div className="max-w-3xl w-full mx-auto px-6 py-12">
          <div className="animate-scale-in" key={current}>
            <div className="inline-flex items-center gap-2 bg-secondary px-3 py-1 rounded-sm mb-6">
              <span className="text-xs font-sans font-medium text-muted-foreground tracking-wider uppercase">
                {question.topic}
              </span>
            </div>

            <h2 className="font-serif text-2xl font-semibold text-primary leading-snug mb-8">
              {question.text}
            </h2>

            <div className="space-y-3 mb-8">
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={confirmed}
                  className={`w-full text-left border rounded-sm px-5 py-4 font-sans text-sm leading-relaxed transition-all ${optionStyle(idx)}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-sm border border-current flex items-center justify-center text-xs font-medium mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                    {confirmed && idx === question.correct && (
                      <Icon name="Check" size={16} className="text-green-600 ml-auto flex-shrink-0 mt-0.5" />
                    )}
                    {confirmed && idx === selected && selected !== question.correct && (
                      <Icon name="X" size={16} className="text-red-500 ml-auto flex-shrink-0 mt-0.5" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {confirmed && (
              <div className="bg-primary/5 border border-primary/20 rounded-sm p-4 mb-8 animate-fade-in">
                <div className="flex items-start gap-3">
                  <Icon name="BookOpen" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans text-xs font-medium text-primary mb-1 uppercase tracking-wider">Пояснение</p>
                    <p className="font-sans text-sm text-foreground leading-relaxed">{question.explanation}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="text-sm font-sans text-muted-foreground">
                {confirmed ? (
                  selected === question.correct ? (
                    <span className="text-green-600 font-medium flex items-center gap-1.5">
                      <Icon name="CheckCircle" size={14} /> +10 баллов
                    </span>
                  ) : (
                    <span className="text-red-500 font-medium flex items-center gap-1.5">
                      <Icon name="XCircle" size={14} /> 0 баллов
                    </span>
                  )
                ) : (
                  <span>Выберите ответ</span>
                )}
              </div>

              {!confirmed ? (
                <button
                  onClick={handleConfirm}
                  disabled={selected === null}
                  className="bg-primary text-primary-foreground font-sans font-medium text-sm px-6 py-3 rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Подтвердить ответ
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="bg-accent text-accent-foreground font-sans font-semibold text-sm px-6 py-3 rounded-sm hover:bg-accent/90 transition-colors flex items-center gap-2"
                >
                  {isLast ? "Завершить тест" : "Следующий вопрос"}
                  <Icon name="ArrowRight" size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
