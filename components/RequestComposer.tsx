"use client";
import { useRef, useState, type FormEvent } from "react";
import { reachGoal } from "@/lib/analytics";
import { site } from "@/lib/site";

export default function RequestComposer({ kind = "board" }: { kind?: "board" | "parts" }) {
  const parts = kind === "parts";
  const [contact, setContact] = useState("");
  const [size, setSize] = useState(""); const [qty, setQty] = useState("");
  const [city, setCity] = useState(""); const [grade, setGrade] = useState(""); const [note, setNote] = useState("");
  const [pending, setPending] = useState(false); const [saved, setSaved] = useState(false); const [error, setError] = useState("");
  const retry = useRef({ body: "", key: "" });
  const submitting = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const value = contact.trim();
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const phone = /^[+\d\s()\-]+$/.test(value) && value.replace(/\D/g, "").length >= 10 && value.replace(/\D/g, "").length <= 15;
    if (!email && !phone) { setError("Укажите телефон с кодом страны или электронную почту."); return; }
    if (qty && (!Number.isFinite(Number(qty)) || Number(qty) <= 0 || (parts && !Number.isInteger(Number(qty))))) { setError(parts ? "Количество должно быть целым числом больше нуля." : "Укажите объём больше нуля."); return; }
    setError(""); setPending(true); submitting.current = true;
    const body = JSON.stringify({ kind, contact: value, size, quantity: qty, grade, city, note, page: window.location.pathname });
    if (retry.current.body !== body) retry.current = { body, key: crypto.randomUUID() };
    const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_LEADS_API_URL || "/api/leads", { method: "POST", headers: { "Content-Type": "application/json", "Idempotency-Key": retry.current.key }, body, signal: controller.signal });
      const result = await response.json();
      if (!response.ok || !result.saved || typeof result.id !== "string") throw new Error("not_saved");
      setSaved(true); reachGoal("request_saved", { product: kind, placement: "request" });
    } catch { setError("Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь с нами по телефону."); }
    finally { clearTimeout(timeout); setPending(false); submitting.current = false; }
  }
  return <section className="section bg-cream" data-product={kind} data-placement="request" id={parts ? "request-parts" : "request-board"}><div className="container">
    <div className="section-head"><p className="eyebrow">{parts ? "Ваш проект из бука" : "Бук для вашего производства"}</p><h2 className="section-title">{parts ? "Рассчитать детали по чертежу" : "Подобрать партию доски"}</h2><p className="section-lead">{parts ? "Оставьте контакт — обсудим деталь, отделку и подготовим расчёт." : "Оставьте контакт — подберём буковую доску и подготовим предложение для вашего производства."}</p></div>
    <div className="request-grid lead-grid">
      <div className="card lead-card ym-hide-content ym-disable-keys">
      {saved ? <div className="lead-success" role="status"><span className="lead-success-icon" aria-hidden="true">✓</span><h3>Заявка принята</h3><p>Менеджер свяжется с вами по указанному контакту и уточнит детали заказа.</p><button type="button" className="text-link" onClick={() => { setSaved(false); setContact(""); retry.current = { body: "", key: "" }; }}>Отправить ещё одну заявку</button></div> :
      <form className="request-fields" onSubmit={submit} aria-busy={pending}>
        <label htmlFor={`${kind}-contact`}>Телефон или электронная почта<input id={`${kind}-contact`} name="contact" type="text" autoComplete="on" required maxLength={150} value={contact} onChange={e=>{ setContact(e.target.value); setError(""); }} placeholder="+7 … или name@company.ru" aria-describedby={`${kind}-contact-note`} /></label>
        <p className="note lead-contact-note" id={`${kind}-contact-note`}>Достаточно одного контакта. Используем его, чтобы ответить на ваш запрос.</p>
        <details className="lead-details"><summary>Уточнить параметры {parts ? "деталей" : "партии"} <span>необязательно</span></summary><div className="request-fields lead-options">
          <label>{parts ? "Деталь и размеры" : "Толщина доски, мм"}{parts ? <input name="dimensions" maxLength={200} value={size} onChange={e=>setSize(e.target.value)} placeholder="Ножка стола, 700 × 60 × 60 мм" /> : <select name="thickness" value={size} onChange={e=>setSize(e.target.value)}><option value="">Помогите подобрать</option>{[25,30,40,50].map(n=><option key={n} value={n}>{n} мм</option>)}</select>}</label>
          <label>{parts ? "Количество, шт." : "Примерный объём, м³"}<input name="quantity" type="number" min={parts ? "1" : "0.1"} step={parts ? "1" : "any"} value={qty} onChange={e=>setQty(e.target.value)} placeholder={parts ? "Например: 200" : "Например: 5"} /></label>
          {!parts && <label>Сорт<select name="grade" value={grade} onChange={e=>setGrade(e.target.value)}><option value="">Помогите подобрать</option>{["A","AB","B"].map(s=><option key={s}>{s}</option>)}</select></label>}
          <label>Город доставки или самовывоз<input name="city" maxLength={120} value={city} onChange={e=>setCity(e.target.value)} placeholder="Москва / самовывоз" /></label>
          <label>{parts ? "Отделка и пожелания" : "Длина и другие пожелания"}<textarea name="note" maxLength={800} rows={3} value={note} onChange={e=>setNote(e.target.value)} placeholder={parts ? "Покраска, цвет, желаемый срок" : "Нужные длины, требования к партии"} /></label>
        </div></details>
        {error && <p className="lead-error" role="alert">{error}</p>}
        <button className="btn btn-primary lead-submit" type="submit" disabled={pending}>{pending ? "Отправляем заявку…" : parts ? "Получить расчёт" : "Получить предложение"}</button>
        <noscript><p>Для отправки формы включите JavaScript или позвоните менеджеру.</p></noscript>
      </form>}
      </div>
      <aside className="lead-aside"><p className="eyebrow">Обсудим ваш заказ</p><h3>{parts ? "От идеи — к готовой детали" : "Доска под ваши задачи"}</h3><ol className="lead-steps"><li><b>Уточним требования</b><p>{parts ? "Обсудим размеры, количество и отделку." : "Подберём толщину, сорт и объём партии."}</p></li><li><b>Подготовим предложение</b><p>{parts ? "Согласуем стоимость и сроки изготовления." : "Пришлём актуальные цены и фото доски."}</p></li><li><b>Согласуем отгрузку</b><p>Самовывоз из Щёлково или доставка транспортной компанией.</p></li></ol><p className="lead-direct">Удобнее обсудить сразу?<br /><a className="text-link" href={site.phoneHref}>{site.phoneDisplay}</a> · <a className="text-link" href={site.telegram} target="_blank" rel="noopener noreferrer">Telegram</a></p></aside>
    </div>
  </div></section>;
}
