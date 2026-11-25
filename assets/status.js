export function getStatus(event, now=new Date()) {
  if(now.getTime()>Date.parse(`${event.date}T16:45:00+08:00`))return 'past';
  if(now.getTime()>Date.parse(`${event.deadline}T23:59:59+08:00`)||!event.registration)return 'closed';
  return 'open';
}
