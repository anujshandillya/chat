function padZero(num: number) {
    return num.toString().padStart(2, '0');
}

export default function extractTime(dateString: string) {
    const date=new Date(dateString);
    const hours=padZero(date.getHours());
    const minutes=padZero(date.getMinutes());
    return `${hours}:${minutes}`;
}