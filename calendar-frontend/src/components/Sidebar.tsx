function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-4 flex flex-col gap-4">
      {/* Small Calendar placeholder */}
      <div className="flex-1 bg-gray-300 rounded p-4 flex items-center justify-center">
        Small calendar
      </div>

      {/* TODO list placeholder */}
      <div className="flex-1 bg-gray-300 rounded p-4 flex items-center justify-center">
        TODO list
      </div>
    </aside>
  );
}

export default Sidebar;
