import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import CalendarView from "./components/CalendarView"
import './App.css'

function App() {
  return (
    <div className="w-screen h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Body layout: sidebar + main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 p-4 overflow-auto">
          <CalendarView />
        </main>
      </div>
    </div>
  );
}

export default App;

