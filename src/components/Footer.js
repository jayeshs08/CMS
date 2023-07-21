import React from "react";
import {
Box,
Container,
Row,
Column,
FooterLink,
Heading,
} from "./FooterStyles";

const Footer = () => {
return (
	<Box>
	<Container>
		<Row>
		<Column>
			<Heading>About Us</Heading>
			<FooterLink href="#">Aim</FooterLink>
			<FooterLink href="#">Vision</FooterLink>
			<FooterLink href="#">Testimonials</FooterLink>
		</Column>
		<Column>
			<Heading>Support</Heading>
			<FooterLink href="#">IT Helpdesk</FooterLink>
			<FooterLink href="#">Email</FooterLink>
			<FooterLink href="#">Contact Us</FooterLink>
		</Column>
		</Row>
	</Container>
	</Box>
);
};

export default Footer;