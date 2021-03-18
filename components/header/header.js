import Menu from './menu'
import TopBar from './topbar'

export default function Header() {
    return (
        <div className="header">
            <TopBar/>
            <Menu/>
        </div>
    )
}
