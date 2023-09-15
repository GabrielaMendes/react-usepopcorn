import { useState } from "react";
import { ToggleOpenBtn } from "./ToggleOpenBtn";

export function Box({ children }) {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className="box">
			<ToggleOpenBtn
				isOpen={isOpen}
				onToggleOpen={() => setIsOpen((open) => !open)}
			/>
			{isOpen && children}
		</div>
	);
}
