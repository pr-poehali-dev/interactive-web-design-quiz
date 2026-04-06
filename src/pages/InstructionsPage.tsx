import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const steps = [
  {
    num: "01",
    title: "Ознакомьтесь с вопросом",
    desc: "Каждый вопрос относится к одной из тем: типографика, цвет, композиция, UX или инструменты. Читайте внимательно.",
  },
  {
    num: "02",
    title: "Выберите один ответ",
    desc: "Для каждого вопроса предусмотрен один правильный ответ из четырёх вариантов. Изменить выбор невозможно после перехода к следующему вопросу.",
  },
  {
    num: "03",
    title: "Следите за прогрессом",
    desc: "Полоса прогресса показывает текущий вопрос из 10. Каждый правильный ответ приносит 10 баллов из 100 возможных.",
  },
  {
    num: "04",
    title: "Получите результат",
    desc: "После завершения вы увидите итоговый балл, разбивку по темам и подробные объяснения к каждому вопросу.",
  },
];

export default function InstructionsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col animate-fade-in">
      <header className="border-b border-border bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <Icon name="PenTool" size={16} className="text-primary-foreground" />
            </div>
            <span className="font-sans font-600 text-sm tracking-widest uppercase text-primary">
              WebDesign Assessment
            </span>
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Главная", path: "/" },
              { label: "Инструкция", path: "/instructions", active: true },
              { label: "О проекте", path: "/about" },
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
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="mb-12 animate-slide-up">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 font-sans"
            >
              <Icon name="ArrowLeft" size={14} />
              На главную
            </button>
            <h1 className="font-serif text-4xl font-semibold text-primary mb-4">
              Инструкция
            </h1>
            <p className="font-sans text-muted-foreground text-lg">
              Прочитайте правила прохождения теста перед началом.
            </p>
          </div>

          <div className="space-y-6 mb-12">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="bg-white border border-border rounded-sm p-6 flex gap-6 animate-slide-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex-shrink-0">
                  <span className="font-serif text-3xl font-semibold text-primary/20">
                    {step.num}
                  </span>
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-primary rounded-sm p-6 mb-8">
            <div className="flex items-start gap-4">
              <Icon name="Info" size={18} className="text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-sans font-medium text-primary-foreground mb-1">Важно знать</p>
                <p className="font-sans text-sm text-primary-foreground/70 leading-relaxed">
                  Тест не ограничен по времени. Вы можете обдумывать каждый вопрос столько, сколько необходимо. 
                  Результаты отображаются только после завершения всех 10 вопросов.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm font-sans text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Icon name="HelpCircle" size={14} className="text-accent" />
                10 вопросов
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="Award" size={14} className="text-accent" />
                100 баллов
              </div>
            </div>
            <button
              onClick={() => navigate("/test")}
              className="bg-accent text-accent-foreground font-sans font-semibold text-sm px-8 py-3.5 rounded-sm hover:bg-accent/90 transition-colors flex items-center gap-2"
            >
              Начать тест
              <Icon name="ArrowRight" size={16} />
            </button>
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
