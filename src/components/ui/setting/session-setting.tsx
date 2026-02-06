"use client"
import { authClient } from "@/lib/auth-client"
import { Session } from "@/types/better-auth"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../shadcn-component/button";


export function SessionSetting() {
	const [sessions, setSessions] = useState<Session["session"][] | null>(null);
	const fetchSessions = async () => {
			try {
				const sessions = await authClient.listSessions();
				console.log("Fetched sessions:", sessions.data);
				setSessions(sessions.data);
			} catch (error) {
				console.error("Error fetching sessions:", error);
			}
		}

	useEffect(() => {
		fetchSessions();
	}, []);

	const revokeSession = async (sessionId: string) => {
		try {
			await authClient.revokeSession({
				token: sessionId
			});
			toast.success("Session ended successfully");
			fetchSessions(); // Refresh the session list after revoking
		} catch (error) {
			console.error("Error revoking session:", error);
			toast.error("Failed to end session");
		}
	}
  return (
    <div className="flex flex-col gap-4">
			<h2 className="text-2xl font-bold">Session</h2>
			<ul className="flex flex-col gap-3">
			{
				sessions ? (
					sessions.map((session:Session["session"]) => (
						<li key={session.id} className="flex flex-col gap-3 p-4 border rounded-md">
							<div>Connected on <span className="italic">{session.userAgent}</span> <br/><br/> Created at: <span className="italic">{session.createdAt.toLocaleString()}</span></div>
							<Button variant="destructive" onClick={() => revokeSession(session.token)} className="self-end">End session</Button>
						</li>
					))
				): null
			}
			</ul>
		</div>
  )
}
