export default function Footer({ onHomeClick, onAboutClick }: { onHomeClick: () => void, onAboutClick: () => void }) {
    return (
        <footer className="footer">
            <p>
                <span className="footer-link" onClick={onHomeClick}>Home</span>
                <span className="footer-divider">•</span>
                <span className="footer-link" onClick={onAboutClick}>About</span>
                <span className="footer-divider">•</span>
                Built with ❤️ by <a href="https://kishore-sv.me" target="_blank">Kishore</a>
            </p>
        </footer>
    )
}