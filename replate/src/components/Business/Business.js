import React from "react";
import Header from "../Header";
import Footer from "../Footer";

// IMPORT CONTEXT
import { BusinessContext } from "../../contexts/BusinessContext";

export default function Business() {
	return (
		<div className="container">
			<Header />
			<Footer />
		</div>
	)
}