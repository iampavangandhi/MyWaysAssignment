function SideBar() {
  const closeSidebar = (e) => {
    e.preventDefault();
    console.log(isSignedIn);
    document.getElementById("App").classList.remove("blur");
    document.getElementById("sidebar").classList.remove("active");
  };

  return (
    <div id="sidebar" className="sidebar">
      <button onClick={closeSidebar} className="close-button">
        X
      </button>
    </div>
  );
}

export default SideBar;
