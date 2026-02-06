"use client"
import { authClient } from "@/lib/auth-client"
import { Session } from "@/types/better-auth"
import { useEffect, useState } from "react";


export function SessionSetting() {
	const [sessions, setSessions] = useState<Session["session"][] | null>(null);
	useEffect(() => {
		const fetchSessions = async () => {
			try {
				const sessions = await authClient.listSessions();
				console.log("Fetched sessions:", sessions.data);
				setSessions(sessions.data);
			} catch (error) {
				console.error("Error fetching sessions:", error);
			}
		}
		fetchSessions();
	}, []);

  return (
    <div className="flex flex-col gap-4">
			<h2 className="text-2xl font-bold">Session</h2>
			<ul className="flex flex-col gap-3">
			{
				sessions ? (
					sessions.map((session:Session["session"]) => (
						<li key={session.id} className="p-4 border rounded-md">
							<div>Connected on <span className="italic">{session.userAgent}</span> <br/><br/> Created at: <span className="italic">{session.createdAt.toLocaleString()}</span></div>
						</li>
					))
				): null
			}
			</ul>
		</div>
  )
}
