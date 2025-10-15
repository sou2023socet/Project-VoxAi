import { useState } from 'react';
import API from '../services/api';


export default function Chat() {
const [message, setMessage] = useState('');
const [messages, setMessages] = useState([]);


const send = async () => {
if (!message) return;
const userMsg = { role: 'user', content: message };
setMessages((m) => [...m, { ...userMsg }]);


const res = await API.post('/api/chat', { message });
const reply = res.data.reply;
setMessages((m) => [...m, { role: 'assistant', content: reply }]);
setMessage('');
};


return (
<div className="p-4 max-w-3xl mx-auto">
<div className="space-y-2">
{messages.map((m, i) => (
<div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
<div className="inline-block p-2 rounded-lg bg-gray-100">{m.content}</div>