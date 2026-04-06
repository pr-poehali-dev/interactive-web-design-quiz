import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const topics = [
  { icon: "Type", label: "Типографика", desc: "Шрифтовые пары, кернинг, межстрочный интервал, иерархия текста" },
  { icon: "Palette", label: "Цветовая теория", desc: "Цветовые схемы, контрастность WCAG, психология цвета" },
  { icon: "Layout", label: "Композиция", desc: "Золотое сечение, сетки, визуальная иерархия, баланс" },
  { icon: "MousePointer", label: "UX-принципы", desc: "Законы Фиттса и Хика, когнитивная нагрузка, паттерны" },
  { icon: "Figma", label: "Инструменты", desc: "Figma, Design Tokens, компонентные системы, Auto Layout" },
];

export default function AboutPage() {
  const navigate = useNavigate();

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
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Главная", path: "/" },
              { label: "Инструкция", path: "/instructions" },
              { label: "О проекте", path: "/about", active: true },
            ].map(({ label, path, active }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`text-sm font-sans transition-colors ${active ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"}`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="animate-slide-up">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 font-sans"
            >
              <Icon name="ArrowLeft" size={14} />
              На главную
            </button>

            <div className="grid md:grid-cols-2 gap-16 items-start mb-16">
              <div>
                <h1 className="font-serif text-4xl font-semibold text-primary mb-6">О проекте</h1>
                <p className="font-sans text-muted-foreground leading-relaxed mb-4">
                  WebDesign Assessment — профессиональный инструмент для объективной оценки знаний в области веб-дизайна. 
                  Разработан для дизайнеров, разработчиков и менеджеров продукта.
                </p>
                <p className="font-sans text-muted-foreground leading-relaxed mb-4">
                  Тест охватывает пять ключевых областей: типографику, цветовую теорию, композицию, 
                  UX-принципы и профессиональные инструменты. Каждый вопрос сопровождается развёрнутым объяснением.
                </p>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  Результаты помогают определить направления для профессионального роста 
                  и сформировать персональный план обучения.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Вопросов в тесте", value: "10" },
                  { label: "Максимальный балл", value: "100" },
                  { label: "Тематических блоков", value: "5" },
                  { label: "Уровней результата", value: "4" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <span className="font-sans text-sm text-muted-foreground">{label}</span>
                    <span className="font-serif text-2xl font-semibold text-primary">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-16">
              <h2 className="font-sans text-xs text-muted-foreground uppercase tracking-widest mb-6">
                Темы тестирования
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topics.map((t, i) => (
                  <div
                    key={t.label}
                    className="bg-white border border-border rounded-sm p-5 animate-slide-up"
                    style={{ animationDelay: `${i * 0.07}s` }}
                  >
                    <div className="w-9 h-9 bg-primary/8 rounded-sm flex items-center justify-center mb-4">
                      <Icon name={t.icon} size={17} className="text-primary" />
                    </div>
                    <h3 className="font-sans font-semibold text-foreground mb-1.5 text-sm">{t.label}</h3>
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary rounded-sm p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-primary-foreground mb-2">
                  Готовы проверить знания?
                </h3>
                <p className="font-sans text-sm text-primary-foreground/70">
                  10 вопросов · 100 баллов · ~10 минут
                </p>
              </div>
              <button
                onClick={() => navigate("/instructions")}
                className="flex-shrink-0 bg-accent text-accent-foreground font-sans font-semibold text-sm px-8 py-3.5 rounded-sm hover:bg-accent/90 transition-colors flex items-center gap-2"
              >
                Начать тест
                <Icon name="ArrowRight" size={16} />
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
