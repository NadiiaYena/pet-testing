import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BlockScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Запам'ятовуємо поточне положення в історії
    window.history.pushState(null, "", window.location.href);

    const onPopState = () => {
      window.history.pushState(null, "", window.location.href);
    };

    // Слухаємо подію popstate для виявлення натискання кнопки назад
    window.addEventListener("popstate", onPopState);

    // Очищення слухача подій при розмонтуванні компонента
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [navigate]);

  return (
    <div className="blockScreen">
      <div className="blockScreen-text">Дякуємо! тестування завершено.</div>
    </div>
  );
}

export default BlockScreen;
