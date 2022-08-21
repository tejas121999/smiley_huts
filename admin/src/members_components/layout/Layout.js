import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useAuth } from "../hooks/useAuth";

const MembersLayout = ({ children }) => {
	const { user } = useAuth();
	return (
		<div className="">
			{user ?
				(
					<Header />
					// <></>
				)
				: null}
			{children}
			{/*user ? <Footer /> :null*/}
		</div>
	)
}

export default MembersLayout;