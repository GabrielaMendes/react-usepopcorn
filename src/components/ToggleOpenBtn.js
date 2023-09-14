export function ToggleOpenBtn({ isOpen, onToggleOpen }) {
	return (
		<button className="btn-toggle" onClick={onToggleOpen}>
			{isOpen ? "–" : "+"}
		</button>
	);
}
