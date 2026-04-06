import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col animate-fade-in">
      <header className="border-b border-border bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <Icon name="PenTool" size={16} className="text-primary-foreground" />
            </div>
            <span className="font-sans font-600 text-sm tracking-widest uppercase text-primary">
              WebDesign Assessment
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Главная", path: "/" },
              { label: "Инструкция", path: "/instructions" },
              { label: "О проекте", path: "/about" },
            ].map(({ label, path }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="text-sm font-sans text-muted-foreground hover:text-primary transition-colors"
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 flex items-center">
        <div className="max-w-5xl mx-auto px-6 py-20 w-full">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-sm px-3 py-1.5 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                <span className="text-xs font-sans font-medium text-accent-foreground tracking-wider uppercase">
                  Профессиональная оценка
                </span>
              </div>

              <h1 className="font-serif text-5xl font-semibold text-primary leading-tight mb-6">
                Тест по<br />
                <span className="text-accent" style={{ fontStyle: "italic" }}>веб-дизайну</span>
              </h1>

              <p className="font-sans text-muted-foreground text-lg leading-relaxed mb-10">
                Проверьте профессиональный уровень знаний в области типографики, 
                цвета, композиции и UX. Объективная оценка за 10 вопросов.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                {[
                  { icon: "HelpCircle", label: "10 вопросов" },
                  { icon: "Award", label: "100 баллов" },
                  { icon: "Clock", label: "~10 минут" },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm font-sans text-muted-foreground">
                    <Icon name={icon} size={15} className="text-accent" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => navigate("/instructions")}
                  className="bg-primary text-primary-foreground font-sans font-medium text-sm px-8 py-3.5 rounded-sm hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  Начать тестирование
                  <Icon name="ArrowRight" size={16} />
                </button>
                <button
                  onClick={() => navigate("/about")}
                  className="border border-border text-foreground font-sans font-medium text-sm px-6 py-3.5 rounded-sm hover:bg-secondary transition-colors"
                >
                  О проекте
                </button>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/5 rounded-sm -rotate-2"></div>
                <div className="relative bg-white border border-border rounded-sm p-8">
                  <div className="space-y-4">
                    {[
                      { topic: "Типографика", score: 95 },
                      { topic: "Цветовая теория", score: 82 },
                      { topic: "Композиция", score: 78 },
                      { topic: "UX-принципы", score: 91 },
                      { topic: "Инструменты", score: 87 },
                    ].map(({ topic, score }) => (
                      <div key={topic}>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-sm font-sans text-foreground">{topic}</span>
                          <span className="text-xs font-sans font-medium text-muted-foreground">{score}/100</span>
                        </div>
                        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground font-sans">Итоговый балл</p>
                      <p className="text-2xl font-serif font-semibold text-primary">87 / 100</p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-sm text-xs font-sans font-medium">
                      <Icon name="CheckCircle" size={13} />
                      Эксперт
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-6">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <p className="text-xs font-sans text-muted-foreground">
            WebDesign Assessment — профессиональное тестирование
          </p>
          <p className="text-xs font-sans text-muted-foreground">2026</p>
        </div>
      </footer>
    </div>
  );
}