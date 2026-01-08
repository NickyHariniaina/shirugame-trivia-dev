export const sendMessage = async (roomId: string, userId: string, content: string) => {
  try {
    const url = `/api/rooms/${roomId}/messages`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId,
        senderId: userId,
        content,
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMessages = async (roomId: string) => {
  try {
    const url = `/api/rooms/${roomId}/messages`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
