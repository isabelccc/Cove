/** After sign-in, resume invite flow or go to circles home. */
export default function postAuthRedirect(push: (path: string) => void): void {
  const pending = sessionStorage.getItem('pendingInviteToken');
  sessionStorage.removeItem('pendingInviteToken');
  if (pending) {
    push(`/join/${encodeURIComponent(pending)}`);
    return;
  }
  push('/circles');
}
