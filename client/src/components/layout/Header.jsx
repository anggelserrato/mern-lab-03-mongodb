import DbStatus from "../DbStatus";

function Header() {
  return (
    <div>
      <h2>Task Manager</h2>
      <p>Los datos persisten en MongoDB</p>
      <DbStatus />
    </div>
  );
}

export default Header;
