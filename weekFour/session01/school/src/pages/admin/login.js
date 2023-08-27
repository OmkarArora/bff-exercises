import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Router from "next/router";

export default function Login() {
	const [email, setEmail] = useState("admin@test.com");
	const [password, setPassword] = useState("124567890");

	async function onSubmit(e) {
		e.preventDefault();
		if (!email || !password) {
			return;
		}
		let data = { email, password };
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/admin`, {
				body: JSON.stringify(data),
				method: "POST",
			});
			const json = await res.json();
			if (json.message === "User logged in") {
				Router.replace("/teachers");
			}
			console.log(json);
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<form
			className="py-8 max-w-[500px] mx-auto flex flex-col"
			onSubmit={onSubmit}
		>
			<label className="my-1">Email</label>
			<Input
				placeholder="admin"
				type="email"
				name="email"
				onChange={(e) => setEmail(e.target.value)}
				value={email}
			/>
			<label className="my-1 mt-3">Password</label>
			<Input
				placeholder="password"
				type="text"
				name="password"
				onChange={(e) => setPassword(e.target.value)}
				value={password}
			/>
			<Button type="submit" className="mt-4 rounded-md">
				Submit
			</Button>
		</form>
	);
}
