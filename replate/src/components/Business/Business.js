import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

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