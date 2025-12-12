export const Header = () => (
  <header>
      <a href="/">Globomantics Helpdesk</a>
      <nav>
        <ul>
          <li>Dashboard</li>
          <li className="active">Manage</li>
          <li>Accounts</li>
          <li>Settings</li>
        </ul>
      </nav>
    </header>
)

export const Main = (props) => (
  <main>
    {props.children}
  </main>
)

export const FormGroup = (props) => (
  <div className="form-group">
    {props.children}
  </div>
)
