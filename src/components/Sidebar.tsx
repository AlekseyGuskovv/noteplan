export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-logo">NotePlan</h2>

      <nav className="sidebar-nav">
        <a href="#" className="nav-item active">Календарь</a>
        <a href="#" className="nav-item">Заметки</a>
        <a href="#" className="nav-item">Задачи</a>
      </nav>

      <button className="sidebar-add">+ Новая заметка</button>
    </aside>
  )
}