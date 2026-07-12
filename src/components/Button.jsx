export default function Button({
  children,
  isActive,
  variant,
  className = "",
  ...props
}) {
  // Базовый класс, который есть всегда
  let buttonClasses = `btn-primary ${isActive ? "active" : ""}`;

  // Если передали особый вариант (например, danger для удаления)
  if (variant === "danger") {
    buttonClasses += " btn-danger"; // добавится глобальный класс для красной кнопки
  }

  // Дополнительно склеиваем с классами, которые могут прийти из CSS-модулей
  const finalClass = `${buttonClasses} ${className}`.trim();

  return (
    <button className={finalClass} {...props}>
      {children}
    </button>
  );
}
